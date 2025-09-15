from fastapi import HTTPException
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.ext.asyncio import AsyncSession

from src.schemas import UserCreate, UserData, UserBase, UserLogin, Token
from src.db.repositories import UserRepository
from src.db.models import User
from src.core import get_password_hash, verify_password
from src.config import settings
from .jwt_service import create_auth_token, create_verify_token
from .stripe_service import get_stripe_customer_id
from .smtp_service import send_verification_email_for_create_account, send_verification_email_for_reset_password

class UserService:
    def __init__(self, db: AsyncSession):
        self.repository = UserRepository(db)

    async def create_user(self, user_data: UserCreate, country: str, verified: bool = False) -> UserData:
        existing_user = await self.repository.get_by_email(user_data.email)
        if existing_user:
            if existing_user.verified:
                raise HTTPException(status_code=400, detail="Email already registered")
            if existing_user.blocked:
                raise HTTPException(status_code=402, detail="Email is blocked")
            existing_user.verified = verified
            existing_user.first_name = user_data.first_name
            existing_user.last_name = user_data.last_name
            existing_user.avatar = user_data.avatar
            existing_user.hashed_password = get_password_hash(user_data.password)
            return await self.repository.create_or_update_user(existing_user)
        else:
            hashed_password = get_password_hash(user_data.password)
            stripe_customer_id = await get_stripe_customer_id(user_data.email)
            new_user = User(
                email=user_data.email,
                first_name=user_data.first_name,
                last_name=user_data.last_name,
                avatar = user_data.avatar,
                country = country,
                hashed_password=hashed_password, 
                stripe_customer_id=stripe_customer_id,
                verified=verified
            )
            return await self.repository.create_or_update_user(new_user)
    
    async def login_user(self, user_data: UserLogin) -> Token:
        existing_user = await self.repository.get_by_email(user_data.email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        if existing_user.blocked:
            raise HTTPException(status_code=402, detail="User is blocked")
        if not existing_user.verified:
            raise HTTPException(status_code=403, detail="Email is not verified")

        logined = verify_password(user_data.password, existing_user.hashed_password)
        if not logined:
            raise HTTPException(status_code=401, detail="Password is not correct")
        
        return create_auth_token({
            "id": existing_user.id,
            "email": existing_user.email,
            "first_name": existing_user.first_name,
            "last_name": existing_user.last_name,
            "avatar": existing_user.avatar,
            "country": existing_user.country,
            "role": existing_user.role.value,
            "tier": existing_user.tier.value,
            "verified": existing_user.verified,
            "blocked": existing_user.blocked
        })

    async def get_token_by_email(self, user_data: UserCreate, country: str) -> Token:
        existing_user = await self.repository.get_by_email(user_data.email)
        if not existing_user:
            existing_user = await self.create_user(user_data, country=country, verified=True)

        if existing_user.blocked:
            raise HTTPException(status_code=402, detail="Email is blocked")

        return create_auth_token({
            "id": existing_user.id,
            "email": existing_user.email,
            "first_name": existing_user.first_name,
            "last_name": existing_user.last_name,
            "avatar": existing_user.avatar,
            "country": existing_user.country,
            "role": existing_user.role.value,
            "tier": existing_user.tier.value,
            "verified": existing_user.verified,
            "blocked": existing_user.blocked
        })

    async def send_verification_link_for_create(self, user_data: UserCreate, country: str):
        new_user = await self.create_user(user_data, country)

        if new_user.blocked:
            raise HTTPException(status_code=402, detail="Email is blocked")
            
        token = create_verify_token({
            "id": new_user.id,
            "email": new_user.email,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "avatar": new_user.avatar,
            "country": country,
            "role": new_user.role.value,
            "tier": new_user.tier.value,
            "verified": new_user.verified,
            "blocked": new_user.blocked
        })
        try:
            await run_in_threadpool(
                send_verification_email_for_create_account,
                new_user.email,
                new_user.first_name,
                new_user.last_name,
                f"https://{settings.DOMAIN}/verify?token={token.token}&target=register"
            )
        except:
            raise HTTPException(status_code=500, detail="Failed to send verification email")

    async def send_verification_link_for_repwd(self, user_data: UserBase):
        existing_user = await self.repository.get_by_email(user_data.email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="Email not found")
        if existing_user.blocked:
            raise HTTPException(status_code=402, detail="Email is blocked")

        token = create_verify_token({
            "id": existing_user.id,
            "email": existing_user.email,
            "first_name": existing_user.first_name,
            "last_name": existing_user.last_name,
            "avatar": existing_user.avatar,
            "country": existing_user.country,
            "role": existing_user.role.value,
            "tier": existing_user.tier.value,
            "verified": existing_user.verified,
            "blocked": existing_user.blocked
        })
        try:
            await run_in_threadpool(
                send_verification_email_for_reset_password,
                existing_user.email,
                existing_user.first_name,
                existing_user.last_name,
                f"https://{settings.DOMAIN}/verify?token={token.token}&target=repwd"
            )
        except:
            raise HTTPException(status_code=500, detail="Failed to send verification email")

    async def verify_email(self, user_data: UserData):
        existing_user = await self.repository.get_by_email(user_data.email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        if existing_user.blocked:
            raise HTTPException(status_code=402, detail="Email is blocked")

        existing_user.verified = True
        updated_user = await self.repository.create_or_update_user(existing_user)
        
        return create_auth_token({
            "id": updated_user.id,
            "email": updated_user.email,
            "first_name": updated_user.first_name,
            "last_name": updated_user.last_name,
            "avatar": updated_user.avatar,
            "country": updated_user.country,
            "role": updated_user.role.value,
            "tier": updated_user.tier.value,
            "verified": updated_user.verified,
            "blocked": updated_user.blocked
        })
        
    async def reset_password(self, user_data: UserLogin):
        existing_user = await self.repository.get_by_email(user_data.email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        if existing_user.blocked:
            raise HTTPException(status_code=402, detail="Email is blocked")

        hashed_password = get_password_hash(user_data.password)
        existing_user.hashed_password = hashed_password
        await self.repository.create_or_update_user(existing_user)
        
        return