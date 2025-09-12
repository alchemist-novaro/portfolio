from fastapi import APIRouter

from .auth import auth_router
from .portfolio_agent import portfolio_agent_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(portfolio_agent_router, prefix="/portfolio-agent", tags=["portfolio-agent"])

__all__ = [
    "api_router"
]