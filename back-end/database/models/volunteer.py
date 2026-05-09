from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar
from datetime import date


class VolunteerBase(SQLModel):
    display_name: str
    avatar: Optional[str] = None
    first_name: str
    last_name: str
    phone: str
    date_of_birth: date
    area: str
    bio: Optional[str]

class Volunteer(VolunteerBase, table=True):
    __tablename__: ClassVar[str] = "volunteers" #type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", unique=True)
    country_id: int = Field(foreign_key="countries.id")
    shirt_size_id: int = Field(foreign_key="shirt_sizes.id")

class VolunteerPublic(VolunteerBase):
    id: int
    country_id: int
    shirt_size_id: int