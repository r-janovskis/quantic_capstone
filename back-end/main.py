from fastapi import FastAPI
from sqlmodel import SQLModel

class APIResponse(SQLModel):
    status: str
    message: str
    status_code: int



app = FastAPI()

@app.get("/", response_model=APIResponse, status_code=201)
def home() -> APIResponse:
    
    return {"status_code": 200, "message": "My dummy API endpoint", "status": "success"}

# Command to run the app
# uvicorn main:app --reload