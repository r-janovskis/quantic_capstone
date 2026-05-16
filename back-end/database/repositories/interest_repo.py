from sqlmodel import Session, select, col
from database.models.interest import Interest, InterestPublic

def get_all_interests(session: Session) -> list[Interest]:
    statement = select(Interest)
    return list(session.exec(statement).all())


def get_selected_interests(session: Session, interest_ids: list[int]) -> list[InterestPublic]:
    statement = select(Interest).where(col(Interest.id).in_(interest_ids))
    return [InterestPublic.model_validate(interest) for interest in session.exec(statement).all()]