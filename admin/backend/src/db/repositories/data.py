from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.db.models import Data

class DataRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_data_by_domain(self, domain: str) -> Data | None:
        stmt = select(Data).where(Data.domain == domain)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def add_new_data(self, data: Data) -> Data:
        try:
            self.db.add(data)
            await self.db.commit()
            await self.db.refresh(data)
            return data
        except Exception as e:
            await self.db.rollback()
            raise e

    async def update_data(self, data: Data) -> Data:
        try:
            self.db.add(data)
            await self.db.commit()
            await self.db.refresh(data)
            return data
        except Exception as e:
            await self.db.rollback()
            raise e