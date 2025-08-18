from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "<project-name>"
    SECRET_KEY: str = "<secret-key>"
    DATABASE_URL: str = "postgresql+asyncpg://user:password@host:port/dbname"
    SERVER_PORT: int = 5002
    
    class Config:
        env_file = ".env"

settings = Settings()