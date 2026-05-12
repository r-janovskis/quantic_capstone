from sqlmodel import SQLModel, Field
from sqlalchemy import CheckConstraint
from typing import Optional, ClassVar
from datetime import time


class TimePeriodBase(SQLModel):
    name: str
    start_time: time
    end_time: time

class TimePeriod(TimePeriodBase, table=True):
    __tablename__: ClassVar[str] = "time_periods" #type: ignore[assignment]
    __table_args__ = (CheckConstraint("end_time > start_time", name="ck_time_period_end_after_start"),)
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)


class TimePeriodPublic(TimePeriodBase):
    id: int