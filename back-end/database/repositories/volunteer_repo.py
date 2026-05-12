from sqlmodel import Session, select, delete, col
from schemas.availability import Availability
from database.models.volunteer import Volunteer
from database.models.volunteer_skill import VolunteerSkill
from database.models.volunteer_interest import VolunteerInterest
from database.models.volunteer_language import VolunteerLanguage
from database.models.volunteer_availability import VolunteerAvailability


# -------------------------------------------------------
#   Creatre, update and other calls for table: volunteers
# -------------------------------------------------------

def create_volunteer(session: Session, volunteer: Volunteer) -> Volunteer:
    session.add(volunteer)
    session.commit()
    session.refresh(volunteer)
    return volunteer

def update_volunteer(session: Session, volunteer: Volunteer) -> Volunteer:
    session.add(volunteer)
    session.commit()
    session.refresh(volunteer)
    return volunteer


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

# ----------------------------------------------------
#   Creatre and update for table: volunteers_skills
# ----------------------------------------------------

def create_volunteer_skills(session: Session, volunteer_id: int, skill_ids: list[int]) -> None:
    session.add_all([
        VolunteerSkill(volunteer_id=volunteer_id, skill_id=skill_id) 
        for skill_id in skill_ids
    ])
    session.commit()

def update_volunteer_skills(session: Session, volunteer_id: int, skill_ids: list[int]) -> None:
    statement = delete(VolunteerSkill).where(col(VolunteerSkill.volunteer_id) == volunteer_id)
    session.exec(statement)
    session.add_all([
        VolunteerSkill(volunteer_id=volunteer_id, skill_id=skill_id)
        for skill_id in skill_ids
    ])
    session.commit()

# ----------------------------------------------------
#   Creatre and update for table: volunteers_interests
# ----------------------------------------------------

def create_volunteer_interests(session: Session, volunteer_id: int, interest_ids: list[int]) -> None:
    session.add_all([
        VolunteerInterest(volunteer_id=volunteer_id, interest_id=interest_id) 
        for interest_id in interest_ids
    ])
    session.commit()

def update_volunteer_interests(session: Session, volunteer_id: int, interest_ids: list[int]) -> None:
    statement = delete(VolunteerInterest).where(col(VolunteerInterest.volunteer_id) == volunteer_id)
    session.exec(statement)
    session.add_all([
        VolunteerInterest(volunteer_id=volunteer_id, interest_id=interest_id)
        for interest_id in interest_ids
    ])

# ----------------------------------------------------
#   Creatre and update for table: volunteers_languages
# ----------------------------------------------------

def create_volunteer_languages(session: Session, volunteer_id: int, language_ids: list[int]) -> None:
    session.add_all([
        VolunteerLanguage(volunteer_id=volunteer_id, language_id=language_id)
        for language_id in language_ids
    ])
    session.commit()

def update_volunteer_languages(session: Session, volunteer_id: int, language_ids: list[int]) -> None:
    statement = delete(VolunteerLanguage).where(col(VolunteerLanguage.volunteer_id) == volunteer_id)
    session.exec(statement)
    session.add_all([
        VolunteerLanguage(volunteer_id=volunteer_id, language_id=language_id)
        for language_id in language_ids
    ])

# -------------------------------------------------------
#   Creatre and update for table: volunteers_availability
# -------------------------------------------------------

def create_volunteer_availability(session: Session, volunteer_id: int, availability: list[Availability]) -> None:
    session.add_all([
        VolunteerAvailability(volunteer_id=volunteer_id, day_id=availability_slot.day_id, time_period_id=availability_slot.time_period_id)
        for availability_slot in availability
    ])
    session.commit()

def update_volunteer_availability(session: Session, volunteer_id: int, availability: list[Availability]) -> None:
    statement = delete(VolunteerAvailability).where(col(VolunteerAvailability.volunteer_id) == volunteer_id)
    session.exec(statement)
    session.add_all([
        VolunteerAvailability(volunteer_id=volunteer_id, day_id=availability_slot.day_id, time_period_id=availability_slot.time_period_id)
        for availability_slot in availability
    ])







    
