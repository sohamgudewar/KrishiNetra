from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes
from app.core.config import settings
from app.core.database import engine
from app.models.models import Base

Base.metadata.create_all(bind=engine)


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="KrishiNetra - GeoAI + AI Administration for Smart Agriculture in Maharashtra"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(routes.router, prefix="/api/v1")

    @app.get("/health")
    def health_check():
        return {"status": "healthy", "version": settings.VERSION}

    return app


app = create_app()
