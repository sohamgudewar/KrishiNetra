from fastapi import UploadFile
from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def process_document(file: UploadFile) -> dict:
    contents = await file.read()

    prompt = """
    Analyze this agricultural document/form. Extract the following data into JSON:
    - farmer_name: Full name of the farmer
    - aadhar_number: Aadhar card number (12 digits)
    - claimed_crop: Crop type being claimed
    - claimed_area: Area in acres/ha (float value)
    - district: District name
    - taluka: Taluka/Block name
    - village: Village name
    - document_type: Type of form (subsidy_application, insurance_claim, etc.)
    
    Return ONLY valid JSON. No markdown, no explanations.
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, contents]
    )
    
    import json
    return json.loads(response.text)
