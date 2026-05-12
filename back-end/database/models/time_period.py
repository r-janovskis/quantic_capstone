from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar


class TimePeriodBase(SQLModel):
    name: str

class TimePeriod(TimePeriodBase, table=True):
    __tablename__: ClassVar[str] = "time_periods" #type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)


class TimePeriodPublic(TimePeriodBase):
    id: int