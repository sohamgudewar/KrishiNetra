from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.geoai.crop_classifier import classify_crop, detect_stress
from app.services.geoai.satellite_processor import get_ndvi_map, calculate_area

router = APIRouter()


@router.post("/classify/{farmer_id}")
def run_crop_classification(farmer_id: int, db: Session = Depends(get_db)):
    result = classify_crop(farmer_id=farmer_id, db=db)
    return result


@router.post("/stress/{farmer_id}")
def run_stress_detection(farmer_id: int, db: Session = Depends(get_db)):
    result = detect_stress(farmer_id=farmer_id, db=db)
    return result


@router.get("/ndvi/{farmer_id}")
def get_farmer_ndvi(farmer_id: int, db: Session = Depends(get_db)):
    ndvi_data = get_ndvi_map(farmer_id=farmer_id, db=db)
    return ndvi_data


@router.get("/area/{farmer_id}")
def get_land_area(farmer_id: int, db: Session = Depends(get_db)):
    area_data = calculate_area(farmer_id=farmer_id, db=db)
    return area_data
