from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Grievance
from app.schemas.schemas import GrievanceCreate, GrievanceResponse

router = APIRouter()


@router.post("/", response_model=GrievanceResponse)
def create_grievance(grievance: GrievanceCreate, db: Session = Depends(get_db)):
    db_grievance = Grievance(**grievance.model_dump())
    db.add(db_grievance)
    db.commit()
    db.refresh(db_grievance)
    return db_grievance


@router.get("/", response_model=List[GrievanceResponse])
def list_grievances(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Grievance).offset(skip).limit(limit).all()


@router.get("/{grievance_id}", response_model=GrievanceResponse)
def get_grievance(grievance_id: int, db: Session = Depends(get_db)):
    grievance = db.query(Grievance).filter(Grievance.id == grievance_id).first()
    if not grievance:
        raise HTTPException(status_code=404, detail="Grievance not found")
    return grievance
