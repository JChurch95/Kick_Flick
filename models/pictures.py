from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship
from .base import Base

if TYPE_CHECKING:
    from .skaters import Skater

class Picture(Base, table=True):
    __tablename__ = "pictures"

    id: Optional[int] = Field(default=None, primary_key=True)
    skater_id: int = Field(foreign_key="skaters.id")
    skater_picture: str

    skater: Optional["Skater"] = Relationship(back_populates="pictures")