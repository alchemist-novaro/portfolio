from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "<project-name>"
    SECRET_KEY: str = "<secret-key>"
    DATABASE_URL: str = "postgresql+asyncpg://user:password@host:port/dbname"
    SERVER_PORT: int = 5001
    STATIC_ALLOWED_ORIGINS: list[str] = []
    VERIFY_JWT_SECRET: str = "<access-jwt-secret>"
    AUTH_JWT_SECRET: str = "<verify-jwt-secret>"
    VERIFY_TOKEN_EXPIRE_TIMEOUT: int = 15
    AUTH_TOKEN_EXPIRE_TIMEOUT: int = 120
    JWT_ALGORITHM: str = "HS256"
    SMTP_EMAIL_ADDRESS: str = "<john-doe@example.com>"
    SMTP_PASSWORD: str = "<smtp-password>"
    GOOGLE_REDIRECT_URI: str = "<google-redirect-uri>"
    GOOGLE_CLIENT_ID: str = "<google-client-id>"
    GOOGLE_CLIENT_SECRET: str = "<google-client-secret>"
    
    class Config:
        env_file = ".env"

settings = Settings()