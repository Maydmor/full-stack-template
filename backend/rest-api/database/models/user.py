import enum
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, DateTime, func
from sqlalchemy.orm import relationship
from database.models import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=False, nullable=False)
    profile = relationship('Profile', cascade='all, delete-orphan', uselist=False)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

