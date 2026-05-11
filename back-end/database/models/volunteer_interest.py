from sqlmodel import SQLModel, Field
from typing import ClassVar

class VolunteerInterest(SQLModel, table=True):
    __tablename__: ClassVar[str] = "volunteers_interests" #type: ignore[assignment]
    volunteer_id: int = Field(foreign_key="volunteers.id", primary_key=True)
    interest_id: int = Field(foreign_key="interests.id", primary_key=True)