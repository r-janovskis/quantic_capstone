from sqlmodel import Session, select
from database.models.language import Language

def get_all_languages(session: Session) -> list[Language]:
    statement = select(Language)
    return list(session.exec(statement).all())