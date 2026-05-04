from sqlalchemy.orm import Session
from app.models.models import Application


def approve_application(application_id: int, db: Session) -> dict:
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        return {"error": "Application not found"}

    application.status = "approved"
    db.commit()

    return {
        "status": "approved",
        "application_id": application_id,
        "message": "Application approved successfully",
    }


def reject_application(application_id: int, db: Session) -> dict:
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        return {"error": "Application not found"}

    application.status = "rejected"
    db.commit()

    return {
        "status": "rejected",
        "application_id": application_id,
        "message": "Application rejected",
    }


def flag_for_review(application_id: int, reason: str, db: Session) -> dict:
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        return {"error": "Application not found"}

    application.status = "flagged"
    application.recommendation = reason
    db.commit()

    return {
        "status": "flagged",
        "application_id": application_id,
        "message": f"Application flagged for review: {reason}",
    }
