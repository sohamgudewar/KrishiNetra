from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.core.database import Base


class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(15))
    aadhar_number = Column(String(12), unique=True)
    district = Column(String(50), nullable=False)
    taluka = Column(String(50))
    village = Column(String(50))

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    land_area_claimed = Column(Float)
    land_area_verified = Column(Float)

    geojson_boundary = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, nullable=False)
    application_type = Column(String(50))
    claimed_crop = Column(String(50))
    claimed_area = Column(Float)
    document_url = Column(String(255))

    extracted_data = Column(JSON)
    geoai_verification = Column(JSON)
    verification_status = Column(String(20), default="pending")
    recommendation = Column(Text)

    assigned_officer = Column(Integer)
    status = Column(String(20), default="submitted")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, nullable=False)
    application_id = Column(Integer)
    category = Column(String(50))
    description = Column(Text)

    geoai_analysis = Column(JSON)
    status = Column(String(20), default="open")

    assigned_officer = Column(Integer)
    resolution = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class CropAnalysis(Base):
    __tablename__ = "crop_analyses"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, nullable=False)

    detected_crop = Column(String(50))
    confidence = Column(Float)
    detected_area = Column(Float)

    ndvi_value = Column(Float)
    stress_level = Column(String(20))
    stress_zones = Column(JSON)

    satellite_date = Column(DateTime(timezone=True))
    analysis_metadata = Column(JSON)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
