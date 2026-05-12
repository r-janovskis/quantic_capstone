from sqlmodel import Session, select
from database.models.day import Day


def get_all_days(session: Session) -> list[Day]:
    statement = select(Day)
    return list(session.exec(statement).all())