from fastapi import Depends, HTTPException
from jose import JWTError, jwt

from src.schemas import oauth2_scheme, UserData
from src.config import settings
from src.enums import UserRole, UserTier

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.AUTH_JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        
        required_fields = ["id", "email", "first_name", "last_name", "role", "tier", "verified", "blocked", "stripe_customer_id"]
        if not all(field in payload for field in required_fields):
            raise credentials_exception
        
        if not payload["verified"]:
            raise HTTPException(
                status_code=403,
                detail="User account is not verified. Please verify your email to continue."
            )
        if payload["blocked"]:
            raise HTTPException(
                status_code=403,
                detail="User account is blocked. Please contact support.",
            )
            
        return UserData(
            email=payload["email"],
            id=payload["id"],
            first_name=payload["first_name"],
            last_name=payload["last_name"],
            role=UserRole(payload["role"]),
            tier=UserTier(payload["tier"]),
            verified=payload["verified"],
            blocked=payload["blocked"],
            stripe_customer_id=payload["stripe_customer_id"]
        )
    except (JWTError, ValueError) as e:
        raise credentials_exception

def get_verifying_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.VERIFY_JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        
        required_fields = ["id", "email", "first_name", "last_name", "role", "tier", "verified", "blocked", "stripe_customer_id"]
        if not all(field in payload for field in required_fields):
            raise credentials_exception

        if payload["blocked"]:
            raise HTTPException(
                status_code=403,
                detail="User account is blocked. Please contact support.",
            )
            
        return UserData(
            email=payload["email"],
            id=payload["id"],
            first_name=payload["first_name"],
            last_name=payload["last_name"],
            role=UserRole(payload["role"]),
            tier=UserTier(payload["tier"]),
            verified=payload["verified"],
            blocked=payload["blocked"],
            stripe_customer_id=payload["stripe_customer_id"]
        )
    except (JWTError, ValueError) as e:
        raise credentials_exception