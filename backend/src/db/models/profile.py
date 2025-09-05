from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base

class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(Integer, nullable=False, unique=True, index=True, primary_key=True, autoincrement=True)
    avatar: Mapped[str] = mapped_column(String, nullable=True)
    location: Mapped[str] = mapped_column(String, nullable=False)
    position: Mapped[str] = mapped_column(String, nullable=False)
    company: Mapped[str] = mapped_column(String, nullable=False)
    bio: Mapped[str] = mapped_column(String, nullable=True)