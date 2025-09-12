from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Server config
    PROJECT_NAME: str = "<project-name>"
    SERVER_PORT: int = 5001
    SECRET_KEY: str = "<secret-key>"
    STATIC_ALLOWED_ORIGINS: list[str] = []

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://user:password@host:port/dbname"

    # JWT
    VERIFY_JWT_SECRET: str = "<access-jwt-secret>"
    AUTH_JWT_SECRET: str = "<verify-jwt-secret>"
    VERIFY_TOKEN_EXPIRE_TIMEOUT: int = 15
    AUTH_TOKEN_EXPIRE_TIMEOUT: int = 120
    JWT_ALGORITHM: str = "HS256"
    
    # SMTP
    SMTP_EMAIL_ADDRESS: str = "<john-doe@example.com>"
    SMTP_PASSWORD: str = "<smtp-password>"

    # Google Auth
    GOOGLE_REDIRECT_URI: str = "<google-redirect-uri>"
    GOOGLE_CLIENT_ID: str = "<google-client-id>"
    GOOGLE_CLIENT_SECRET: str = "<google-client-secret>"
    
    # Stripe
    STRIPE_SECRET_KEY: str = "<stripe-secret-key>"

    # Personal Infos
    FIRST_NAME: str = "<first-name>"
    LAST_NAME: str = "<last-name>"
    EMAIL_ADDRESS: str = "<email>"
    PHONE_NUMBER: str = "<phone-number>"
    AVATAR: str = "https://..."
    GITHUB: str = "https://..."
    LINKEDIN: str = "https://..."
    TWITTER: str = "https://..."
    FACEBOOK: str = "https://..."
    WHATSAPP: str = "<whatsapp>"
    TELEGRAM: str = "<telegram>"

    # LiveKit
    LIVEKIT_API_KEY: str = "<livekit-api-key>"
    LIVEKIT_API_SECRET: str = "<livekit-api-secret"
    LIVEKIT_URL: str = "<livekit-url>"

    # Agent
    OPENAI_API_KEY: str = "<openai-api-key>"
    DEEPGRAM_API_KEY: str = "<deepgram-api-key>"
    
    class Config:
        env_file = ".env"

settings = Settings()