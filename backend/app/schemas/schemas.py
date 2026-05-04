from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime


class FarmerCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    aadhar_number: Optional[str] = None
    district: str
    taluka: Optional[str] = None
    village: Optional[str] = None
    latitude: float
    longitude: float
    land_area_claimed: Optional[float] = None


class FarmerResponse(BaseModel):
    id: int
    name: str
    district: str
    latitude: float
    longitude: float
    land_area_claimed: Optional[float]
    land_area_verified: Optional[float]

    class Config:
        from_attributes = True


class ApplicationCreate(BaseModel):
    farmer_id: int
    application_type: str
    claimed_crop: str
    claimed_area: float
    document_url: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: int
    farmer_id: int
    application_type: str
    claimed_crop: str
    claimed_area: float
    verification_status: str
    recommendation: Optional[str]
    status: str

    class Config:
        from_attributes = True


class GrievanceCreate(BaseModel):
    farmer_id: int
    application_id: Optional[int] = None
    category: str
    description: str


class GrievanceResponse(BaseModel):
    id: int
    farmer_id: int
    category: str
    description: str
    status: str
    geoai_analysis: Optional[Dict[str, Any]]

    class Config:
        from_attributes = True


class VerificationResult(BaseModel):
    farmer_id: int
    claimed_crop: str
    detected_crop: str
    crop_match: bool
    claimed_area: float
    detected_area: float
    area_discrepancy: float
    ndvi_value: Optional[float]
    stress_level: Optional[str]
    recommendation: str
    confidence: float
