from sqlmodel import Session, select
from database.models.skill import Skill

def get_all_skills(session: Session) -> list[Skill]:
    statement = select(Skill)
    return list(session.exec(statement).all())