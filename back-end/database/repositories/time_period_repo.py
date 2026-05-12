from sqlmodel import Session, select
from database.models.time_period import TimePeriod


def get_all_time_periods(session: Session) -> list[TimePeriod]:
    statement = select(TimePeriod)
    return list(session.exec(statement).all())