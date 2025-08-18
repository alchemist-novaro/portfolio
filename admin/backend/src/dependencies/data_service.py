from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.services import DataService
from src.db import get_db

def get_data_service(db: AsyncSession = Depends(get_db)) -> DataService:
    return DataService(db)