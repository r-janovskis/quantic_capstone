from sqlmodel import SQLModel, Field
from datetime import datetime, timezone
from typing import Optional, ClassVar
from pydantic import EmailStr

# As pylance was struggling to comperhend it inside the Field(...)
def utc_now() -> datetime:
    return datetime.now(timezone.utc)

# Base class which capture all the shared fields
class UserBase(SQLModel):
    email: EmailStr 

# User model that will create table in database
class User(UserBase, table=True):
    __tablename__: ClassVar[str] = "users" # type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True)
    password: bytes
    created: datetime = Field(default_factory=utc_now)
    status: int = Field(foreign_key="statuses.id", default=1) # 1 = New
    last_login: Optional[datetime] = Field(default=None)


class UserPublic(UserBase):
    id: int
    status: int