from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Farmer
from app.schemas.schemas import FarmerCreate, FarmerResponse

router = APIRouter()


@router.post("/", response_model=FarmerResponse)
def create_farmer(farmer: FarmerCreate, db: Session = Depends(get_db)):
    db_farmer = Farmer(**farmer.model_dump())
    db.add(db_farmer)
    db.commit()
    db.refresh(db_farmer)
    return db_farmer


@router.get("/", response_model=List[FarmerResponse])
def list_farmers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Farmer).offset(skip).limit(limit).all()


@router.get("/{farmer_id}", response_model=FarmerResponse)
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer
