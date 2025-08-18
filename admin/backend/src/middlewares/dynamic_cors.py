from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from src.config import settings
from src.db.session import AsyncSessionLocal
from src.db.repositories.data import DataRepository


class DynamicCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origin = request.headers.get("origin")
        allowed_origins = set(settings.STATIC_ALLOWED_DOMAINS)

        async with AsyncSessionLocal() as db:
            repo = DataRepository(db)
            domains = await repo.get_all_domains()
            allowed_origins.update([f"https://{d}" for d in domains])

        if origin and origin not in allowed_origins:
            return JSONResponse({"detail": "CORS origin not allowed"}, status_code=403)

        response = await call_next(request)

        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,PATCH,DELETE,OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Authorization,Content-Type"
            response.headers["Access-Control-Allow-Credentials"] = "true"

        return response