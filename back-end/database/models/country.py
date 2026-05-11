from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar


class CountryBase(SQLModel):
    name: str


class Country(CountryBase, table=True):
    __tablename__: ClassVar[str] = "countries" #type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)


class CountryPublic(CountryBase):
    id: int