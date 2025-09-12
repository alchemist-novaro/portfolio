from fastapi import APIRouter, HTTPException

from src.services import get_access_token_data
from src.schemas import PortfolioAgentTokenData

portfolio_agent_router = APIRouter()

@portfolio_agent_router.get("/token", response_model=PortfolioAgentTokenData)
def get_token(identity: str, room: str = "voice-room"):
    try:
        return get_access_token_data(identity, room)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )