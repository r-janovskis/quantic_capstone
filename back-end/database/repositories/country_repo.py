from sqlmodel import Session, select
from database.models.country import Country


def get_all_countries(session: Session) -> list[Country]:
    statement = select(Country)
    return list(session.exec(statement).all())