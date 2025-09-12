from livekit import api
import uuid

from src.config import settings
from src.schemas import PortfolioAgentTokenData

def get_access_token_data(identity: str, room: str = "portfolio-agent") -> PortfolioAgentTokenData:
    at = api.AccessToken(settings.LIVEKIT_API_KEY, settings.LIVEKIT_API_SECRET)
    at.with_grants(api.VideoGrants(room_join=True, room=f"{room}-{uuid.uuid4()}"))
    at.with_identity(identity)
    token = at.to_jwt()

    return PortfolioAgentTokenData(token=token, server_url=settings.LIVEKIT_URL)