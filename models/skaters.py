from typing import List, TYPE_CHECKING
from sqlmodel import Relationship
from .base import Base

if TYPE_CHECKING:
    from .videos import Video

class Skater(Base, table=True):
    __tablename__ = "skaters"

    skater_name: str
    nationality: str
    brand: str
    bio: str
    videos: List["Video"] = Relationship(back_populates="skater")