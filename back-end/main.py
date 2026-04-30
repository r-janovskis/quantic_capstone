from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from contextlib import asynccontextmanager
import database

import auth

class APIResponse(SQLModel):
    status: str
    message: str
    status_code: int


# Initialise database when app is started
@asynccontextmanager
async def lifespan(app: FastAPI):
    database.create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
# Define middleware to allow CORS
# Port depends on which the front-end is running
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=APIResponse, status_code=200)
def home() -> APIResponse:
    
    return APIResponse(status_code=200, message="My dummy API endpoint", status="success")

# Add auth routes to the app
app.include_router(auth.router)

# Command to run the app
# uvicorn main:app --reload