from fastapi import APIRouter, Query, Body, Depends, HTTPException
from src.services import DataService
from src.dependencies import get_data_service
from src.schemas import DataResponse, DataCreate, DataUpdate

data_router = APIRouter()

@data_router.get("", description="Fetch data by domain", response_model=DataResponse)
async def get_data(
    domain: str = Query(..., description="Domain to fetch data for"),
    data_service: DataService = Depends(get_data_service)
):
    try:
        return await data_service.get_data_by_domain(domain)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@data_router.post("", description="Create new data", response_model=DataResponse)
async def create_data(
    data: DataCreate = Body(..., description="Data to create"),
    data_service: DataService = Depends(get_data_service)
):
    try:
        return await data_service.add_new_data(data)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@data_router.put("", description="Create or update data", response_model=DataResponse)
async def create_or_update_data(
    domain: str = Query(..., description="Domain to update data for"),
    data: DataUpdate = Body(..., description="Data to update"),
    data_service: DataService = Depends(get_data_service)
):
    try:
        return await data_service.create_or_update_data(domain, data)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
