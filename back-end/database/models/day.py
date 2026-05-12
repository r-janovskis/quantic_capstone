from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar


class DayBase(SQLModel):
    name: str

class Day(SQLModel, table=True):
    __tablename__: ClassVar[str] = "days" #type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)

class DayPublic(DayBase):
    id: int