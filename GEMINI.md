# KrishiNetra - Project Instructions

## Project Overview
KrishiNetra is a GeoAI + AI Administration system for Smart Agriculture in Maharashtra, built for AgriHackathon 2026.

## Architecture & Tech Stack
- **Frontend:** React 18 (Vite, Tailwind CSS, Mapbox GL, Recharts)
- **Backend:** FastAPI (Python 3.11, SQLAlchemy)
- **Database:** SQLite (dev) / PostgreSQL + PostGIS (prod)
- **AI/ML:**
    - Google Gemini 2.0 Flash (Document Vision/Extraction)
    - Google Earth Engine (Satellite Imagery)
    - Scikit-learn, NumPy (Crop classification, stress detection)
- **Tasks:** Celery + Redis (Asynchronous processing)

## Development Workflow
- **Backend Entry:** `backend/app/main.py`
- **Frontend Entry:** `frontend/src/main.jsx`
- **Database:** Tables are auto-created by `backend/app/main.py` using SQLAlchemy models.
- **Environment:** Requires a `.env` file in `backend/` with a Gemini API key.

## Conventions
- Use surgical updates for code changes.
- Adhere to the established directory structure: `backend/app/[api|models|schemas|services]` and `frontend/src/[components|pages|services]`.

## Core Services

### 1. GeoAI Services (`backend/app/services/geoai/`)
- **Crop Classification:** Sentinel-2 based identification (Soybean, Cotton, etc.).
- **NDVI & Stress Analysis:** Health monitoring and anomaly detection.
- **Area Calculation:** Precise land measurement from satellite data.
- **Satellite Processor:** Integration with Google Earth Engine API.

### 2. AI Administration Services (`backend/app/services/admin/`)
- **Document Processor:** Gemini 2.0 Flash vision for data extraction (handwritten/printed).
- **Automated Verification:** Logic engine for cross-checking claims vs. GeoAI results.
- **Workflow Engine:** Approval/Rejection/Flagging pipeline.
- **Grievance Management:** Evidence-backed complaint tracking.

## AI Agent Architecture
KrishiNetra employs a multi-agent orchestration pattern to reconcile document claims with satellite observations.

- **Document Extraction Agent:** Gemini-powered vision service for structured data extraction.
- **GeoAI Verification Agent:** Satellite imagery analysis for ground-truth verification.
- **Orchestrator:** Logic layer that cross-references agents to produce final recommendations.

For detailed technical specs of each engine, see [agents.md](./agents.md).
