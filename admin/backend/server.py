from fastapi import FastAPI
import uvicorn
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware

from src.routes import api_router
from src.config import settings
from src.middlewares import DynamicCORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME)
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)
app.add_middleware(DynamicCORSMiddleware)
app.include_router(api_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        app,
        port=settings.SERVER_PORT,
        reload=False
    )
