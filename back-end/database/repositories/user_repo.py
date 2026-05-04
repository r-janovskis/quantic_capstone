from sqlmodel import Session, select
from database.models.user import User, utc_now


def get_user_by_email(session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)

    return session.exec(statement).first()

def create_user(session: Session, email: str, password: bytes) -> User:
    user = User(email=email, password=password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def update_last_login(session: Session, user_id: int) -> User:
    statement = select(User).where(User.id == user_id)
    user = session.exec(statement).first()
    if not user:
        raise ValueError(f"User with id {user_id} not found")
    user.last_login = utc_now()
    session.commit()
    session.refresh(user)
    return user