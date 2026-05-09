from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session

from database.models.skill import SkillPublic
from database.models.language import LanguagePublic
from database.models.country import CountryPublic
from database.models.shirt_size import ShirtSizePublic
from database.models.interest import InterestPublic

from database.repositories.skill_repo import get_all_skills
from database.repositories.language_repo import get_all_languages
from database.repositories.country_repo import get_all_countries
from database.repositories.shirt_size_repo import get_all_shirt_sizes
from database.repositories.interest_repo import get_all_interests



router = APIRouter(prefix="/lookup", tags=["lookup"])

@router.get("/skills", response_model=list[SkillPublic])
def get_skills(session: Session = Depends(get_session)):
    return get_all_skills(session)


@router.get("/languages", response_model=list[LanguagePublic])
def get_languages(session: Session = Depends(get_session)):
    return get_all_languages(session)


@router.get("/countries", response_model=list[CountryPublic])
def get_countries(session: Session = Depends(get_session)):
    return get_all_countries(session)


@router.get("/shirt_sizes", response_model=list[ShirtSizePublic])
def get_shirt_sizes(session: Session = Depends(get_session)):
    return get_all_shirt_sizes(session)


@router.get("/interests", response_model=list[InterestPublic])
def get_interests(session: Session = Depends(get_session)):
    return get_all_interests(session)