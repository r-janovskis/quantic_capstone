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

def create_volunteer_skills(session: Session,volunteer_id: int, skills: list[int]) -> None:
    session.add_all([
        VolunteerSkill(volunteer_id=volunteer_id, skill_id=skill_id) 
        for skill_id in skills
    ])
    session.commit()

def create_volunteer_interests(session: Session, volunteer_id: int, interests: list[int]) -> None:
    session.add_all([
        VolunteerInterest(volunteer_id=volunteer_id, interest_id=interest_id) 
        for interest_id in interests
    ])
    session.commit()

def create_volunteer_languages(session: Session, volunteer_id: int, languages: list[int]) -> None:
    session.add_all([
        VolunteerLanguage(volunteer_id=volunteer_id, language_id=language_id)
        for language_id in languages
    ])
    session.commit()


def get_all_volunteers(session: Session) -> list[Volunteer]:
    statement = select(Volunteer)
    return list(session.exec(statement).all())

