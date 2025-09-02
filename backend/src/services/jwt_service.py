from datetime import timedelta, datetime
from jose import jwt
from src.config import settings
from src.schemas import Token

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_TIMEOUT)):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.ACCESS_JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return Token(token=encoded_jwt)
    
def create_verify_token(data: dict, expires_delta: timedelta = timedelta(minutes=settings.VERIFY_TOKEN_EXPIRE_TIMEOUT)):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.VERIFY_JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return Token(token=encoded_jwt)