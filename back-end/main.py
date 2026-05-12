from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import database
import database.seeds
import os

import auth
import lookup
import volunteer

# Initialise database when app is started
@asynccontextmanager
async def lifespan(app: FastAPI):
    database.create_db_and_tables()
    database.seeds.seed_statuses()
    database.seeds.seed_skills()
    database.seeds.seed_languages()
    database.seeds.seed_countries()
    database.seeds.seed_shirt_sizes()
    database.seeds.seed_interests()
    database.seeds.seed_days()
    database.seeds.seed_time_periods()
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

os.makedirs("../uploads", exist_ok=True)
# Serve static files
# Necessary so we could save avatars and other filers
app.mount("/uploads", StaticFiles(directory="../uploads"), name="uploads")


@app.get("/health", response_model=dict[str, str], status_code=200, tags=["health"])
def health():
    
    return {"status": "healthy"}

# Add auth routes to the app
app.include_router(auth.router)
app.include_router(lookup.router)
app.include_router(volunteer.router)

# Command to run the app
# uvicorn main:app --reload