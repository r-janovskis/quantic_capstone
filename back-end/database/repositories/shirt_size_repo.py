from sqlmodel import Session, select
from database.models.shirt_size import ShirtSize


def get_all_shirt_sizes(session: Session) -> list[ShirtSize]:
    statement = select(ShirtSize)
    return list(session.exec(statement).all())