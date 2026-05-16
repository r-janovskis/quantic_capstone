from sqlmodel import Session, select, col
from database.models.skill import Skill

def get_all_skills(session: Session) -> list[Skill]:
    statement = select(Skill)
    return list(session.exec(statement).all())

def get_selected_skills(session: Session, skill_ids: list[int]) -> list[Skill]:
    statement = select(Skill).where(col(Skill.id).in_(skill_ids))
    return list(session.exec(statement).all())