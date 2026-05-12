from sqlmodel import SQLModel, Field
from typing import ClassVar


class VolunteerAvailability(SQLModel, table=True):
    __tablename__: ClassVar[str] = "volunteers_availability" #type: ignore[assignment]
    volunteer_id: int = Field(foreign_key="volunteers.id", primary_key=True)
    day_id: int = Field(foreign_key="days.id", primary_key=True)
    time_period_id: int = Field(foreign_key="time_periods.id", primary_key=True)