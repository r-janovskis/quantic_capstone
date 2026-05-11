from sqlmodel import Session, select
from database.models.interest import Interest

def get_all_interests(session: Session) -> list[Interest]:
    statement = select(Interest)
    return list(session.exec(statement).all())