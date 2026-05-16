from sqlmodel import Session, select, col
from database.models.language import Language

def get_all_languages(session: Session) -> list[Language]:
    statement = select(Language)
    return list(session.exec(statement).all())


def get_selected_languages(session: Session, skill_ids: list[int]) -> list[Language]:
    statement = select(Language).where(col(Language.id).in_(skill_ids))
    return list(session.exec(statement).all())