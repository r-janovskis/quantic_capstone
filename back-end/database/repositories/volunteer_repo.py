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


def get_all_volunteers(session: Session) -> list[Volunteer]:
    statement = select(Volunteer)
    return list(session.exec(statement).all())
 
