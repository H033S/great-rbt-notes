# app.py
from fastapi import FastAPI, Response, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from main.models import FrontendReportData
from main.models import SessionData
from main.chat import ChatGPTHandler

app = FastAPI(
    title="Report Generation API",
    description="API for generating reports based on session data.",
    version="1.0.0"
)

# --- CORS Middleware Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Routes ---

@app.get("/", tags=["General"])
def read_root():
    return {"message": "API is running."}

# !!! --- MANUAL OPTIONS HANDLER - DEBUGGING --- !!!
@app.options("/api/test/report", tags=["Debug"], status_code=status.HTTP_204_NO_CONTENT)
async def options_test_report():
    """
    Manually handle OPTIONS preflight request for /api/test/report/
    and add required CORS headers directly.
    """
    print(">>> MANUAL OPTIONS HANDLER FOR /api/test/report/ HIT!")
    # Return an empty response but ADD THE HEADERS MANUALLY
    # These headers MUST match what the browser expects based on its request
    return Response(
        status_code=status.HTTP_204_NO_CONTENT, # Use 204 No Content for OPTIONS success
        headers={
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'POST, OPTIONS', 
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
        }
    )
# !!! --- END MANUAL OPTIONS HANDLER --- !!!
@app.post("/api/test/report", tags=["Report Generation"]) # Removed response_class=Response here for simplicity
async def generate_test_report(payload: SessionData):
    """
    Generates a test report by reading a static file.
    Accepts data structured according to the `SessionData` model.
    Returns the content of `test_report.txt` as plain text.
    """
    print(f"Received POST request for /api/test/report")
    try:
        print(f"Received Payload: {payload.model_dump()}")
    except AttributeError:
        print(f"Received Payload: {payload.dict()}")

    report_file_path = "./test_report.txt"
    try:
        with open(report_file_path, "r", encoding='utf-8') as file:
            dummy_report = file.read()
        print(">>> Sending dummy report content as JSON field")
        return Response(content=dummy_report, media_type="application/json") # Test returning JSON
    except FileNotFoundError:
        print(f"Error: Report file not found at {report_file_path}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: Test report file not found."
        )
    except Exception as e:
        print(f"Error reading report file '{report_file_path}': {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error: Could not read report file."
        )
    

# --- Original Report Endpoint (Commented Out) ---
@app.post("/api/v1/report", tags=["Report Generation"])
def generate_report(session_data: SessionData): # Expects the OLD model structure
    """
    (Currently inactive) Generates a report using the ChatGPT handler.
    """
    try:
        gpt_handler = ChatGPTHandler()
        response_content = gpt_handler.query(session_data)
        # Assuming the handler returns a string report
        return Response(content=response_content, media_type="text/plain")
    except Exception as e:
        print(f"Error in /api/v1/report: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate report using GPT.")