from pydantic import BaseModel, EmailStr

class DataBase(BaseModel):
    icon: str
    first_name: str
    last_name: str
    email: EmailStr
    location: str
    phone: str | None
    github: str | None
    linkedin: str | None
    twitter: str | None
    instagram: str | None
    facebook: str | None
    whatsapp: str | None
    discord: str | None
    telegram: str | None
    
class DataCreate(DataBase):
    domain: str

class DataUpdate(DataBase):
    pass

class DataResponse(DataBase):
    domain: str

    model_config = {"from_attributes": True}