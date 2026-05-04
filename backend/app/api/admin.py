from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Application
from app.schemas.schemas import ApplicationResponse
from app.services.admin.workflow import approve_application, reject_application, flag_for_review

router = APIRouter()


@router.post("/applications/{application_id}/approve")
def approve(application_id: int, db: Session = Depends(get_db)):
    result = approve_application(application_id=application_id, db=db)
    return result


@router.post("/applications/{application_id}/reject")
def reject(application_id: int, db: Session = Depends(get_db)):
    result = reject_application(application_id=application_id, db=db)
    return result


@router.post("/applications/{application_id}/flag")
def flag(application_id: int, reason: str, db: Session = Depends(get_db)):
    result = flag_for_review(application_id=application_id, reason=reason, db=db)
    return result


@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_applications = db.query(Application).count()
    pending = db.query(Application).filter(Application.status == "submitted").count()
    approved = db.query(Application).filter(Application.status == "approved").count()
    rejected = db.query(Application).filter(Application.status == "rejected").count()
    flagged = db.query(Application).filter(Application.status == "flagged").count()

    return {
        "total_applications": total_applications,
        "pending": pending,
        "approved": approved,
        "rejected": rejected,
        "flagged": flagged,
    }
