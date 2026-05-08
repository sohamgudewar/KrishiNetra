# KrishiNetra AI Agents & Engines

This document describes the specialized AI components that power KrishiNetra's automated administration and verification.

## 1. AI Administration Agent (Document Processor)
- **Engine:** Google Gemini 2.0 Flash
- **Source:** `backend/app/services/admin/document_processor.py`
- **Responsibilities:**
    - Optical Character Recognition (OCR) for handwritten and printed applications.
    - Named Entity Recognition (NER) to extract farmer names, Aadhar numbers, and locations.
    - Intent detection to classify document types (subsidy vs. insurance).
    - Structured JSON output generation for backend integration.

## 2. GeoAI Engine (Satellite Analysis)
- **Engine:** Scikit-learn + NumPy (Integration with Google Earth Engine)
- **Source:** `backend/app/services/geoai/crop_classifier.py`
- **Responsibilities:**
    - **Crop Classification Agent:** Uses multispectral satellite data to identify crop types (Soybean, Cotton, Wheat, Sugarcane).
    - **Health Monitoring Agent:** Calculates NDVI (Normalized Difference Vegetation Index) to detect crop stress and growth anomalies.
    - **Area Segmentation Agent:** Precisely calculates land boundaries and cultivated area hectares.

## 3. Cross-Verification Agent (Decision Engine)
- **Logic:** `verify_crop_and_area` in `backend/app/services/geoai/crop_classifier.py`
- **Responsibilities:**
    - Comparing claimed values (from Document Processor) against physical reality (from GeoAI Engine).
    - Applying tolerance thresholds for area discrepancies (e.g., ±0.5 hectares).
    - Generating automated recommendations (Approve, Reject, or Flag for Manual Review).
    - Attaching evidence (NDVI values, confidence scores) to each recommendation.

## Agent Interaction Workflow
1. **Submission:** Farmer uploads document.
2. **Extraction:** AI Admin Agent parses the document -> Structured Claim.
3. **Observation:** GeoAI Engine analyzes satellite tiles -> Ground Truth.
4. **Resolution:** Cross-Verification Agent reconciles Claim vs. Ground Truth.
5. **Output:** Dashboard displays recommendation with attached satellite evidence.
