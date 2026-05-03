from fastapi import APIRouter, Depends, Header
from sqlmodel import Session
from security import create_token, verify_token
from database import get_session
from database.models.user import User, UserBase
from database.repositories.user_repo import get_user_by_email, create_user
from pydantic import field_validator
import bcrypt
import re

# Class to represent a user that will be received from the client
class UserRequest(UserBase):
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 10:
            raise ValueError("Password must be at least 10 characters long")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must containe an uppercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain a number")
        if not re.search(r"[^a-zA-Z0-9]", v):
            raise ValueError("Password must contain a special character")
        
        return v


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=dict[str, str])
def signup(payload: UserRequest, session: Session = Depends(get_session)):

    user_from_db = get_user_by_email(session, payload.email)

    if user_from_db:
        return {"status": "Error", "message": "Email alaready in use!"}

    hashed_password = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt())

    create_user(session, payload.email, hashed_password)
    return {"status": "Success", "message": 'You have successfully signed up! Head to the login page to continue setting up account.'}


@router.post("/login", response_model=dict[str, str | int])
def login(payload: UserRequest, session: Session = Depends(get_session)):

    valid_user = True
    DUMMY_HASH = bcrypt.hashpw(b"dummy", bcrypt.gensalt())
    user_from_db = get_user_by_email(session, payload.email)

    if not user_from_db:
        valid_user = False
        hashed_password: bytes = DUMMY_HASH
        user_status = -1
        user_id = -1
    else:
        hashed_password: bytes = bytes(user_from_db.password)
        user_status = user_from_db.status
        user_id = user_from_db.id or -1
    
    is_valid_password: bool = bcrypt.checkpw(payload.password.encode("utf-8"), hashed_password)
    if not is_valid_password:
        valid_user = False

    token = create_token(user_id)

    if not valid_user:
        return {
            "status": "Error", 
            "message": "Incorrect email or password"
        }
    
    return {
        "status": "Success", 
        "message": "Login successful!", 
        "token": token, 
        "user_status": user_status
    }


@router.get("/verify", response_model=dict[str, str])
def verify(authorization: str = Header()):
    token = authorization.removeprefix("Bearer ")
    verify_token(token)

    return {
        "status": "Valid"
        }


