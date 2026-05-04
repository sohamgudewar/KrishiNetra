from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    PROJECT_NAME: str = "KrishiNetra"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/krishinetra"
    REDIS_URL: str = "redis://localhost:6379/0"

    GEMINI_API_KEY: str = ""

    class Config:
        env_file = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env")


settings = Settings()
