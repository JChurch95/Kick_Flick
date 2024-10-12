from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship
from .base import Base

if TYPE_CHECKING:
    from .skaters import Skater

class Video(Base, table=True):
    __tablename__ = "videos"

    skater_id: int = Field(foreign_key="skaters.id")
    video_name: str
    video_date: str
    youtube_url: str
    skater: Optional["Skater"] = Relationship(back_populates="videos")