from sqlalchemy import String, Integer, Boolean, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.enums import UserRole, UserTier
from .base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, nullable=False, unique=True, index=True, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    avatar: Mapped[str | None] = mapped_column(String, nullable=True)
    country: Mapped[str] = mapped_column(String, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, default=UserRole.USER)
    tier: Mapped[UserTier] = mapped_column(Enum(UserTier), nullable=False, default=UserTier.FREE)
    stripe_customer_id: Mapped[str] = mapped_column(String, nullable=False)
    blocked: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    
    # usage_id: Mapped[int] = mapped_column(ForeignKey("usages.id"), nullable=True, unique=True)