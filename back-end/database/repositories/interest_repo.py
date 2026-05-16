from sqlmodel import Session, select, col
from database.models.interest import Interest

def get_all_interests(session: Session) -> list[Interest]:
    statement = select(Interest)
    return list(session.exec(statement).all())


def get_selected_interests(session: Session, skill_ids: list[int]) -> list[Interest]:
    statement = select(Interest).where(col(Interest.id).in_(skill_ids))
    return list(session.exec(statement).all())