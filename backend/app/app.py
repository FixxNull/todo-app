from fastapi import FastAPI
from app.core.config import settings
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.models.user_model import User
from app.models.todo_model import Todo
from app.api.api_v1.router import router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
async def app_init():
    """
    Initialize application services like database connections.
    """
    # Initialize MongoDB connection
    client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING)
    database = client.todo_database
    
    # Initialize Beanie with the database and document models
    await init_beanie(database=database, document_models=[User, Todo])  # Add your document models here   

app.include_router(router, prefix=settings.API_V1_STR)