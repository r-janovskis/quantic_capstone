from sqlmodel import Session, select, col
from database.models.skill import Skill, SkillPublic

def get_all_skills(session: Session) -> list[Skill]:
    statement = select(Skill)
    return list(session.exec(statement).all())

def get_selected_skills(session: Session, skill_ids: list[int]) -> list[SkillPublic]:
    statement = select(Skill).where(col(Skill.id).in_(skill_ids))
    return [SkillPublic.model_validate(skill) for skill in session.exec(statement).all()]