from fastapi import FastAPI
from sqlmodel import SQLModel

import auth

class APIResponse(SQLModel):
    status: str
    message: str
    status_code: int



app = FastAPI()

@app.get("/", response_model=APIResponse, status_code=200)
def home() -> APIResponse:
    
    return APIResponse(status_code=200, message="My dummy API endpoint", status="success")

# Add auth routes to the app
app.include_router(auth.router)

# Command to run the app
# uvicorn main:app --reload