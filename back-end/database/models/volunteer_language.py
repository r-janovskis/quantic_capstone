from sqlmodel import SQLModel, Field
from typing import ClassVar

class UserSkill(SQLModel, table=True):
    __tablename__ = ClassVar[str] = "volunteers_languages" #type: ignore[assignment]
    volunteer_id: int = Field(foreign_key="volunteers.id", primary_key=True)
    language_id: int = Field(foreign_key="languages.id", primary_key=True)