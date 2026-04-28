from fastapi import APIRouter
from pydantic import BaseModel
import bcrypt

# Class to represent a user that will be signed up
class User(BaseModel):
    email: str
    password: str

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=dict[str, str])
def signup(payload: User):
    emails: list[str] = []

    # TODO: Check if email is already in use
    if payload.email in emails:
        return {"status": "Error", "message": "Email alaready in use!"}

    
    hasshed_password = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt())

    # TODO: Save user to DB
    emails.append(payload.email)
    return {"status": "Success", "message": "Sign up successful!", "password": hasshed_password}

@router.post("/login", response_model=dict[str, str])
def login(payload: User):

    # TODO: Check DB if we have this user
    # TODO: Check if password hash is correct
    # is_valid_password = bcrypt.checkpw(payload.password.encode("utf-8"), stored_hash_from_db)
    # TODO: If any of the checks fail, return error

    # TODO: Generate JWT token
    # TODO: Return JWT token and let user through
    return {"status": "Success", "message": "Login successful!", "token": "sample_token"}