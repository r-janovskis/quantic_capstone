from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from database.models.skill import SkillPublic
from database.repositories.skill_repo import get_all_skills



router = APIRouter(prefix="/util", tags=["util"])

@router.get("/skills", response_model=list[SkillPublic])
def get_skills(session: Session = Depends(get_session)):
    return get_all_skills(session)