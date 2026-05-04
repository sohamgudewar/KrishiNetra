from sqlalchemy.orm import Session
from app.models.models import Farmer, CropAnalysis
from app.schemas.schemas import VerificationResult
from app.services.geoai.satellite_processor import get_ndvi_map, calculate_area


def classify_crop(farmer_id: int, db: Session) -> dict:
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        return {"error": "Farmer not found"}

    return {
        "farmer_id": farmer_id,
        "detected_crop": "soybean",
        "confidence": 0.92,
        "latitude": farmer.latitude,
        "longitude": farmer.longitude,
    }


def detect_stress(farmer_id: int, db: Session) -> dict:
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        return {"error": "Farmer not found"}

    return {
        "farmer_id": farmer_id,
        "ndvi_value": 0.65,
        "stress_level": "moderate",
        "stress_zones": [
            {"zone": "northwest", "ndvi": 0.45, "severity": "high"},
            {"zone": "southeast", "ndvi": 0.72, "severity": "low"},
        ],
    }


async def verify_crop_and_area(
    farmer_id: int,
    claimed_crop: str,
    claimed_area: float,
    db: Session
) -> VerificationResult:
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        raise ValueError("Farmer not found")

    classification = classify_crop(farmer_id, db)
    ndvi_data = get_ndvi_map(farmer_id, db)
    area_data = calculate_area(farmer_id, db)

    detected_crop = classification.get("detected_crop", "unknown")
    confidence = classification.get("confidence", 0.0)
    detected_area = area_data.get("area_hectares", 0.0)

    crop_match = detected_crop.lower() == claimed_crop.lower()
    area_discrepancy = abs(detected_area - claimed_area)

    if crop_match and area_discrepancy <= 0.5:
        recommendation = "Approve - Crop and area verified"
    elif crop_match and area_discrepancy <= 1.0:
        recommendation = f"Approve for {detected_area} acres - minor area discrepancy"
    elif not crop_match:
        recommendation = f"Flag - Claimed {claimed_crop} but detected {detected_crop}"
    else:
        recommendation = "Flag - Significant area discrepancy, requires field verification"

    return VerificationResult(
        farmer_id=farmer_id,
        claimed_crop=claimed_crop,
        detected_crop=detected_crop,
        crop_match=crop_match,
        claimed_area=claimed_area,
        detected_area=detected_area,
        area_discrepancy=round(area_discrepancy, 2),
        ndvi_value=ndvi_data.get("ndvi_value"),
        stress_level=ndvi_data.get("stress_level"),
        recommendation=recommendation,
        confidence=confidence,
    )
