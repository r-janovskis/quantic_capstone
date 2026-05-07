from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from database.models.skill import SkillPublic
from database.repositories.skill_repo import get_all_skills
from database.models.language import LanguagePublic
from database.repositories.language_repo import get_all_languages



router = APIRouter(prefix="/lookup", tags=["lookup"])

@router.get("/skills", response_model=list[SkillPublic])
def get_skills(session: Session = Depends(get_session)):
    return get_all_skills(session)


@router.get("/languages", response_model=list[LanguagePublic])
def get_languages(session: Session = Depends(get_session)):
    return get_all_languages(session)