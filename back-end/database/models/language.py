from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar


class LanguageBase(SQLModel):
    language: str


class Language(LanguageBase, table=True):
    __tablename__: ClassVar[str] = "languages" #type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    language: str = Field(unique=True)


class LanguagePublic(LanguageBase):
    id: int