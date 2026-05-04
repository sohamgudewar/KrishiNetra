# KrishiNetra - GeoAI + AI Administration for Smart Agriculture

**AgriHackathon Maharashtra 2026** | Combining Theme 8 (GeoAI) + Theme 9 (AI Administration)

> End-to-end AI-powered agricultural administration system that automatically verifies farmer applications using satellite imagery, processes documents, and manages workflows - reducing verification time from weeks to minutes.

## Problem Statement

Maharashtra's agricultural administration faces critical challenges:
- Officers can't verify if farmer claims are accurate without physical field visits
- Subsidy fraud through false crop/area claims
- Manual processing of thousands of applications takes weeks/months
- No systematic way to validate survey data or detect crop stress
- Grievances take months to resolve due to lack of evidence

## Solution

KrishiNetra combines **GeoAI** (satellite imagery analysis) with **AI Administration** (document processing + workflow automation) to create a complete verification and management system:

1. **Farmer submits application** → Uploads form/document claiming crop type and area
2. **AI extracts data** → Gemini Vision parses forms (even handwritten)
3. **GeoAI verifies** → Satellite imagery confirms actual crop type, calculates real area, detects stress
4. **System cross-checks** → Flags discrepancies between claimed vs actual data
5. **Officer reviews** → Dashboard shows verification results with recommendation
6. **Decision in minutes** → Approve, reject, or flag with full evidence attached

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  Dashboard │ Applications │ Map View │ Grievances           │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API
┌─────────────────────────▼───────────────────────────────────┐
│                  Backend (FastAPI)                           │
│                                                              │
│  ┌──────────────────┐    ┌──────────────────────────────┐   │
│  │   GeoAI Engine   │    │     AI Admin Engine          │   │
│  │                  │    │                              │   │
│  │  - Crop Class.   │    │  - Document Processing       │   │
│  │  - NDVI/Stress   │    │  - Cross-Verification        │   │
│  │  - Area Calc.    │    │  - Workflow Automation       │   │
│  │  - Satellite API │    │  - Grievance Management      │   │
│  └────────┬─────────┘    └──────────────┬───────────────┘   │
│           │                             │                   │
│  ┌────────▼─────────────────────────────▼───────────────┐   │
│  │              SQLite (dev) / PostgreSQL (prod)          │   │
│  │         Farmers │ Applications │ Analyses             │   │
│  └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Features

### GeoAI (Theme 8)
- **Crop Classification**: Identify crops (soybean, cotton, wheat, sugarcane) from Sentinel-2 satellite imagery
- **NDVI Analysis**: Calculate vegetation indices for crop health monitoring
- **Stress Detection**: Identify areas of crop stress using time-series anomaly detection
- **Area Calculation**: Precisely measure land area from satellite imagery
- **Interactive Map**: Visualize crop boundaries, health zones, and stress areas

### AI Administration (Theme 9)
- **Document Processing**: Gemini Vision AI extraction from farmer applications (even handwritten)
- **Automated Verification**: Cross-check claimed data against GeoAI analysis
- **Workflow Automation**: Approval pipeline with role-based access
- **Grievance Management**: Complaint tracking with auto-attached GeoAI evidence
- **Dashboard**: Real-time statistics and district-wise analytics

## Use Cases

| Use Case | GeoAI Role | AI Admin Role |
|----------|------------|---------------|
| **Subsidy Verification** | Confirms crop type and area from satellite | Auto-processes application, cross-verifies, approves/rejects |
| **Insurance Claims** | Detects crop damage from recent satellite images | Calculates compensation, processes claim automatically |
| **Scheme Eligibility** | Identifies farmers in drought-prone areas | Auto-enrolls eligible farmers, sends notifications |
| **Disaster Response** | Detects flood-affected areas in real-time | Generates relief lists, fast-tracks compensation |
| **Grievance Resolution** | Generates fresh analysis with historical data | Routes to officer with all evidence pre-loaded |

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Mapbox GL, Recharts |
| **Backend** | FastAPI, Python 3.11, SQLAlchemy |
| **Database** | SQLite (dev) / PostgreSQL + PostGIS (prod) |
| **GeoAI** | Google Earth Engine, Sentinel-2, Rasterio, GeoPandas |
| **ML** | Scikit-learn, NumPy (crop classification, stress detection) |
| **Document AI** | Google Gemini 2.0 Flash (vision + text extraction) |
| **Task Queue** | Celery + Redis (async processing) |

## Project Structure

```
KrishiNetra/
├── backend/
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   │   ├── farmers.py
│   │   │   ├── applications.py
│   │   │   ├── geoai.py
│   │   │   ├── admin.py
│   │   │   └── grievances.py
│   │   ├── core/             # Config, database
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/
│   │   │   ├── geoai/        # Satellite processing, crop classification
│   │   │   └── admin/        # Document processing, workflow
│   │   ├── utils/            # Helper functions
│   │   └── main.py           # FastAPI app (auto-creates DB tables)
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── MapView.jsx
│   │   │   └── Grievances.jsx
│   │   ├── services/         # API calls
│   │   ├── context/          # React context
│   │   ├── types/            # TypeScript types
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── venv/                     # Python virtual environment
└── README.md
```

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Backend Setup

```powershell
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r backend/requirements.txt

# Set up environment variables
cp backend/.env.example backend/.env
# Edit .env with your Gemini API key (get one free at https://aistudio.google.com/app/apikey)

# Run backend (database auto-creates on first run)
uvicorn app.main:app --reload --app-dir backend --port 8000
```

### Frontend Setup

```powershell
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Development Plan (10 Days)

### Days 1-3: Foundation
- [x] Project structure and scaffolding
- [x] Backend FastAPI setup with SQLite
- [x] Gemini Vision integration for document processing
- [ ] Google Earth Engine integration
- [ ] NDVI calculation pipeline
- [x] Basic React frontend with pages

### Days 4-6: GeoAI Core
- [ ] Crop classification model (3-4 Maharashtra crops)
- [ ] Stress detection with NDVI time-series
- [ ] Area calculation from satellite segmentation
- [ ] Geo-visualization layer on frontend
- [ ] API endpoints for all GeoAI services

### Days 7-8: AI Admin + Integration
- [ ] Cross-verification engine
- [ ] Workflow automation (approve/reject/flag)
- [ ] Grievance management module
- [ ] Dashboard with verification results

### Days 9-10: Polish + Demo
- [ ] End-to-end testing with realistic scenarios
- [ ] Performance optimization
- [ ] Presentation deck + demo video
- [ ] Additional demo features (insurance, disaster response)

## API Endpoints

### Farmers
- `POST /api/v1/farmers/` - Create farmer record
- `GET /api/v1/farmers/` - List all farmers
- `GET /api/v1/farmers/{id}` - Get farmer details

### Applications
- `POST /api/v1/applications/` - Submit new application
- `POST /api/v1/applications/{id}/upload-document` - Upload supporting document
- `GET /api/v1/applications/` - List applications
- `GET /api/v1/applications/{id}` - Get application details

### GeoAI
- `POST /api/v1/geoai/classify/{farmer_id}` - Run crop classification
- `POST /api/v1/geoai/stress/{farmer_id}` - Run stress detection
- `GET /api/v1/geoai/ndvi/{farmer_id}` - Get NDVI map data
- `GET /api/v1/geoai/area/{farmer_id}` - Get land area calculation

### Admin
- `POST /api/v1/admin/applications/{id}/approve` - Approve application
- `POST /api/v1/admin/applications/{id}/reject` - Reject application
- `POST /api/v1/admin/applications/{id}/flag` - Flag for review
- `GET /api/v1/admin/dashboard` - Get dashboard statistics

### Grievances
- `POST /api/v1/grievances/` - Create grievance
- `GET /api/v1/grievances/` - List grievances
- `GET /api/v1/grievances/{id}` - Get grievance details

## Demo Scenario

**Farmer Ramesh Patil from Satara applies for soybean subsidy:**

1. Uploads handwritten application claiming 5 acres of soybean
2. Gemini extracts: name=Ramesh Patil, crop=soybean, area=5.0, location=Satara
3. GeoAI checks satellite tile for farmer's coordinates:
   - Detected crop: soybean (confidence: 92%)
   - Actual area: 4.8 acres
   - NDVI: 0.65 (moderate stress in northwest zone)
4. System cross-checks:
   - Crop match: soybean = soybean
   - Area discrepancy: 0.2 acres (within tolerance)
5. Recommendation: **"Approve for 4.8 acres - minor discrepancy, northwest zone shows stress"**
6. Officer reviews in dashboard and approves in 2 minutes (vs 2 weeks manually)

## License

MIT

## Team

Built for AgriHackathon Maharashtra 2026
