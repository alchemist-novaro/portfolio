from pydantic import BaseModel, EmailStr
from typing import Optional

from src.enums import UserRole, UserTier

class UserBase(BaseModel):
    email: EmailStr
    
class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class UserData(UserBase):
    id: int
    role: UserRole
    tier: UserTier
    blocked: bool
    verified: bool
    model_config = {"from_attributes": True}

class Token(BaseModel):
    token: str