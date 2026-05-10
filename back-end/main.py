from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlmodel import SQLModel
from contextlib import asynccontextmanager
import database

import auth
import lookup
import volunteer

# Initialise database when app is started
@asynccontextmanager
async def lifespan(app: FastAPI):
    database.create_db_and_tables()
    database.seed_statuses()
    database.seed_skills()
    database.seed_languages()
    database.seed_countries()
    database.seed_shirt_sizes()
    database.seed_interests()
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

# Serve static files
# Necessary so we could save avatars and other filers
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/health", response_model=dict[str, str], status_code=200, tags=["health"])
def health():
    
    return {"status": "healthy"}

# Add auth routes to the app
app.include_router(auth.router)
app.include_router(lookup.router)
app.include_router(volunteer.router)

# Command to run the app
# uvicorn main:app --reload