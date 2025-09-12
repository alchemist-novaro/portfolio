from pydantic import BaseModel

class PortfolioAgentTokenData(BaseModel):
    token: str
    server_url: str