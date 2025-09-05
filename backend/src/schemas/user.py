from pydantic import BaseModel, EmailStr

from src.enums import UserRole, UserTier

class UserBase(BaseModel):
    email: EmailStr

class UserPassword(BaseModel):
    password: str

class UserLogin(UserBase):
    password: str
    
class UserCreate(UserLogin):
    first_name: str
    last_name: str

class UserData(UserBase):
    id: int
    first_name: str
    last_name: str
    role: UserRole
    tier: UserTier
    blocked: bool
    verified: bool
    
    model_config = {"from_attributes": True}

class Token(BaseModel):
    token: str