from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api import farmers, applications, geoai, admin, grievances

router = APIRouter()

router.include_router(farmers.router, prefix="/farmers", tags=["farmers"])
router.include_router(applications.router, prefix="/applications", tags=["applications"])
router.include_router(geoai.router, prefix="/geoai", tags=["geoai"])
router.include_router(admin.router, prefix="/admin", tags=["admin"])
router.include_router(grievances.router, prefix="/grievances", tags=["grievances"])
