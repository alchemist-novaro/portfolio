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
        payload = jwt.decode(token.credentials, settings.AUTH_JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        
        required_fields = ["id", "email", "first_name", "last_name", "avatar", "country", "role", "tier", "verified", "blocked"]
        if not all(field in payload for field in required_fields):
            raise credentials_exception
        
        if not payload["verified"]:
            raise HTTPException(
                status_code=403,
                detail="User account is not verified. Please verify your email to continue."
            )
        if payload["blocked"]:
            raise HTTPException(
                status_code=402,
                detail="Email is blocked",
            )
            
        return UserData(
            email=payload["email"],
            id=payload["id"],
            first_name=payload["first_name"],
            last_name=payload["last_name"],
            avatar=payload["avatar"],
            country=payload["country"],
            role=UserRole(payload["role"]),
            tier=UserTier(payload["tier"]),
            verified=payload["verified"],
            blocked=payload["blocked"]
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
        payload = jwt.decode(token.credentials, settings.VERIFY_JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        
        required_fields = ["id", "email", "first_name", "last_name", "avatar", "country", "role", "tier", "verified", "blocked"]
        if not all(field in payload for field in required_fields):
            raise credentials_exception

        if payload["blocked"]:
            raise HTTPException(
                status_code=402,
                detail="Email is blocked",
            )
            
        return UserData(
            email=payload["email"],
            id=payload["id"],
            first_name=payload["first_name"],
            last_name=payload["last_name"],
            avatar=payload["avatar"],
            country=payload["country"],
            role=UserRole(payload["role"]),
            tier=UserTier(payload["tier"]),
            verified=payload["verified"],
            blocked=payload["blocked"]
        )
    except (JWTError, ValueError) as e:
        raise credentials_exception