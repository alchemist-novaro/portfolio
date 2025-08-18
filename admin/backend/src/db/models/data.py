from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base

class Data(Base):
    __tablename__ = "datas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, index=True)
    domain: Mapped[str] = mapped_column(String, nullable=False, unique=True, index=True)
    icon: Mapped[str] = mapped_column(String, nullable=False)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)
    location: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String)
    github: Mapped[str] = mapped_column(String)
    linkedin: Mapped[str] = mapped_column(String)
    twitter: Mapped[str] = mapped_column(String)
    instagram: Mapped[str] = mapped_column(String)
    facebook: Mapped[str] = mapped_column(String)
    whatsapp: Mapped[str] = mapped_column(String)
    discord: Mapped[str] = mapped_column(String)
    telegram: Mapped[str] = mapped_column(String)