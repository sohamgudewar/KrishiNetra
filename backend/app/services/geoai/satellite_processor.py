from sqlalchemy.orm import Session
from app.models.models import Farmer
import datetime


def get_ndvi_map(farmer_id: int, db: Session) -> dict:
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        return {"error": "Farmer not found"}

    return {
        "farmer_id": farmer_id,
        "ndvi_value": 0.65,
        "stress_level": "moderate",
        "date_captured": datetime.datetime.now().isoformat(),
        "satellite_source": "Sentinel-2",
        "cloud_coverage": 5.2,
        "resolution_meters": 10,
    }


def calculate_area(farmer_id: int, db: Session) -> dict:
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        return {"error": "Farmer not found"}

    return {
        "farmer_id": farmer_id,
        "area_hectares": 4.8,
        "area_acres": 11.86,
        "perimeter_meters": 1250.5,
        "boundary_points": [
            {"lat": farmer.latitude + 0.001, "lon": farmer.longitude + 0.001},
            {"lat": farmer.latitude + 0.001, "lon": farmer.longitude - 0.001},
            {"lat": farmer.latitude - 0.001, "lon": farmer.longitude - 0.001},
            {"lat": farmer.latitude - 0.001, "lon": farmer.longitude + 0.001},
        ],
    }
