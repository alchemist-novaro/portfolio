from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "<project-name>"
    SECRET_KEY: str = "<secret-key>"
    DATABASE_URL: str = "postgresql+asyncpg://user:password@host:port/dbname"
    SERVER_PORT: int = 5002
    STATIC_ALLOWED_ORIGINS: list[str] = []
    ACCESS_JWT_SECRET: str = "<access-jwt-secret>"
    VERIFY_JWT_SECRET: str = "<verify-jwt-secret>"
    ACCESS_TOKEN_EXPIRE_TIMEOUT: int = 120
    VERIFY_TOKEN_EXPIRE_TIMEOUT: int = 15
    JWT_ALGORITHM: str = "HS256"
    SMTP_EMAIL_ADDRESS: str = "<john-doe@example.com>"
    SMTP_PASSWORD: str = "<smtp-password>"
    
    class Config:
        env_file = ".env"

settings = Settings()