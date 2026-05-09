from sqlmodel import SQLModel, Field
from typing import ClassVar

class UserSkill(SQLModel, table=True):
    __tablename__ = ClassVar[str] = "volunteers_skills" #type: ignore[assignment]
    volunteer_id: int = Field(foreign_key="volunteers.id", primary_key=True)
    skill_id: int = Field(foreign_key="skills.id", primary_key=True)