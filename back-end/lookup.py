from fastapi import APIRouter, Depends, Header
from sqlmodel import Session
from security import create_token, verify_token
from database import get_session
from database.models.skill import SkillPublic
from database.repositories.skill_repo import get_all_skills
from pydantic import field_validator
import bcrypt
import re



router = APIRouter(prefix="/lookup", tags=["lookup"])

@router.get("/skills", response_model=list[SkillPublic])
def get_skills(session: Session = Depends(get_session)):
    return get_all_skills(session)