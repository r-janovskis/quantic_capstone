from sqlmodel import SQLModel, Field
from typing import Optional, ClassVar


class ShirtSizeBase(SQLModel):
    name: str

class ShirtSize(ShirtSizeBase, table=True):
    __tablename__: ClassVar[str] = "shirt_sizes" #type: ignore[assignment]
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)


class ShirtSizePublic(ShirtSizeBase):
    id: int