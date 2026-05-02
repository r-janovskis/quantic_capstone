from sqlmodel import SQLModel, Field
from datetime import datetime, timezone
from typing import Optional, ClassVar



# Base class which capture all the shared fields
class StatusBase(SQLModel):
    name: str 

# User model that will create table in database
class Status(StatusBase, table=True):
    __tablename__: ClassVar[str] = "statuses" # type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)


class StatusPublic(StatusBase):
    pass