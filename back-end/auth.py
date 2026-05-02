from fastapi import APIRouter, Depends
from sqlmodel import Session
import bcrypt
from security import create_token
from database import get_session
from database.models.user import User, UserBase
from database.repositories.user_repo import get_user_by_email, create_user

# Class to represent a user that will be received from the client
class UserRequest(UserBase):
    password: str

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=dict[str, str])
def signup(payload: UserRequest, session: Session = Depends(get_session)):

    user_from_db = get_user_by_email(session, payload.email)

    if user_from_db:
        return {"status": "Error", "message": "Email alaready in use!"}

    
    hashed_password = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt())

    create_user(session, payload.email, hashed_password)
    return {"status": "Success", "message": 'You have successfully signed up! Head to the login page to continue setting up account.'}


@router.post("/login", response_model=dict[str, str])
def login(payload: UserRequest, session: Session = Depends(get_session)):

    valid_user = True

    user_from_db = get_user_by_email(session, payload.email)

    if not user_from_db:
        valid_user = False

    # Create variables for hashed_password and user_status 
    # as pydance won't suppport user_from_db (that can be User or None) values
    hashed_password: bytes = bytes(user_from_db.password) if user_from_db else b"Dummy password"
    user_status = user_from_db.status if user_from_db else -1
    
    is_valid_password: bool = bcrypt.checkpw(payload.password.encode("utf-8"), hashed_password)
    if not is_valid_password:
        valid_user = False

    token = create_token(payload.email)


    if not valid_user:
        return {"status": "Error", "message": "Incorrect email or password"}
    
    
    return {"status": "Success", "message": "Login successful!", "token": token, "user_status": user_status}