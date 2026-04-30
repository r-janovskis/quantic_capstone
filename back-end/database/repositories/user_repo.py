from sqlmodel import Session, select
from database.models.user import User


def get_user_by_email(session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)

    return session.exec(statement).first()

def create_user(session: Session, email: str, password: bytes) -> User:
    user = User(email=email, password=password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user