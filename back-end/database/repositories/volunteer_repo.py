from sqlmodel import Session, select
from database.models.volunteer import Volunteer
from database.models.volunteer_skill import VolunteerSkill
from database.models.volunteer_interest import VolunteerInterest
from database.models.volunteer_language import VolunteerLanguage



def create_volunteer(session: Session, volunteer: Volunteer) -> Volunteer:
    session.add(volunteer)
    session.commit()
    session.refresh(volunteer)
    return volunteer

def create_volunteer_skills(session: Session,volunteer_id: int, skill_ids: list[int]) -> None:
    session.add_all([
        VolunteerSkill(volunteer_id=volunteer_id, skill_id=skill_id) 
        for skill_id in skill_ids
    ])
    session.commit()

def create_volunteer_interests(session: Session, volunteer_id: int, interest_ids: list[int]) -> None:
    session.add_all([
        VolunteerInterest(volunteer_id=volunteer_id, interest_id=interest_id) 
        for interest_id in interest_ids
    ])
    session.commit()

def create_volunteer_languages(session: Session, volunteer_id: int, language_ids: list[int]) -> None:
    session.add_all([
        VolunteerLanguage(volunteer_id=volunteer_id, language_id=language_id)
        for language_id in language_ids
    ])
    session.commit()


def get_all_volunteers(session: Session) -> list[Volunteer]:
    statement = select(Volunteer)
    return list(session.exec(statement).all())

def get_volunteer_by_user_id(session: Session, user_id: int) -> Volunteer | None:
    statement = select(Volunteer).where(Volunteer.user_id == user_id)
    return session.exec(statement).first()

def update_volunteer_avatar(session: Session, volunteer: Volunteer, avatar_url: str) -> None:
    volunteer.avatar_url = avatar_url
    session.add(volunteer)
    session.commit()
    
