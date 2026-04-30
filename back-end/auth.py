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

    # TODO: Check DB if we have this user
    
    user_from_db = get_user_by_email(session, payload.email)

    # TODO: Check if email is already in use
    if user_from_db:
        return {"status": "Error", "message": "Email alaready in use!"}

    
    hashed_password = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt())

    # TODO: Save user to DB
    create_user(session, payload.email, hashed_password)
    return {"status": "Success", "message": 'You have successfully signed up! Head to the login page to continue setting up account.'}


@router.post("/login", response_model=dict[str, str])
def login(payload: User):

    # TODO: Check DB if we have this user
    valid_user = True
    if payload.email not in ['reinis@abc.com', 'test@xyz@com']:
        valid_user = False

    # TODO: Check if password hash is correct
    if not payload.password:
        valid_user = False
    # is_valid_password = bcrypt.checkpw(payload.password.encode("utf-8"), stored_hash_from_db)
    
    # TODO: Generate JWT token
    token = create_token(payload.email)

    # TODO: If any of the checks fail, return error
    if not valid_user:
        return {"status": "Error", "message": "Incorrect email or password"}
    
    # TODO: Return JWT token and let user through
    return {"status": "Success", "message": "Login successful!", "token": token, "user_status": "New"}