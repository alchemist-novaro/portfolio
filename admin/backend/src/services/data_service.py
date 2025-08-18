from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.repositories import DataRepository
from src.db.models import Data
from src.schemas import DataCreate, DataUpdate, DataResponse

class DataService:
    def __init__(self, db: AsyncSession):
        self.repository = DataRepository(db)

    async def get_data_by_domain(self, domain: str):
        data = await self.repository.get_data_by_domain(domain)
        if not data:
            raise HTTPException(status_code=404, detail="Data not found")
        return DataResponse.model_validate(data)

    async def add_new_data(self, data: DataCreate) -> DataResponse:
        new_data = await self.repository.add_new_data(Data(**data.model_dump()))
        return DataResponse.model_validate(new_data)

    async def update_data(self, domain: str, data: DataUpdate) -> DataResponse:
        existing_data = await self.repository.get_data_by_domain(domain)
        if not existing_data:
            raise HTTPException(status_code=404, detail="Data not found")

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(existing_data, field, value)

        updated_data = await self.repository.update_data(existing_data)
        return DataResponse.model_validate(updated_data)