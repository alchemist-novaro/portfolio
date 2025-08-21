from fastapi import APIRouter

from .data import data_router

api_router = APIRouter()
api_router.include_router(data_router, prefix="/data", tags=["data"])

__all__ = [
    "api_router"
]