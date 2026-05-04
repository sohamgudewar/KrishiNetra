from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Application
from app.schemas.schemas import ApplicationCreate, ApplicationResponse
from app.services.admin.document_processor import process_document
from app.services.geoai.crop_classifier import verify_crop_and_area

router = APIRouter()


@router.post("/", response_model=ApplicationResponse)
async def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db)
):
    db_application = Application(
        farmer_id=application.farmer_id,
        application_type=application.application_type,
        claimed_crop=application.claimed_crop,
        claimed_area=application.claimed_area,
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)

    verification = await verify_crop_and_area(
        farmer_id=application.farmer_id,
        claimed_crop=application.claimed_crop,
        claimed_area=application.claimed_area,
        db=db
    )

    db_application.geoai_verification = verification.model_dump()
    db_application.verification_status = "verified"
    db_application.recommendation = verification.recommendation
    db.commit()
    db.refresh(db_application)

    return db_application


@router.post("/{application_id}/upload-document")
async def upload_document(
    application_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    extracted_data = await process_document(file)
    application.extracted_data = extracted_data
    db.commit()

    return {"status": "processed", "extracted_data": extracted_data}


@router.get("/", response_model=List[ApplicationResponse])
def list_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Application).offset(skip).limit(limit).all()


@router.get("/{application_id}", response_model=ApplicationResponse)
def get_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    return application
