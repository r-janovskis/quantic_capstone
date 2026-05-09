from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar


class InterestBase(SQLModel):
    name: str


class Interest(InterestBase, table=True):
    __tablename__: ClassVar[str] = "interests" #type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)

class InterestPublic(InterestBase):
    id: int