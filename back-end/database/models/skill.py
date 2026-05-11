from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar



# Base class which capture all the shared fields
class SkillBase(SQLModel):
    name: str 

# User model that will create table in database
class Skill (SkillBase, table=True):
    __tablename__: ClassVar[str] = "skills" # type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)


class SkillPublic(SkillBase):
    id: int