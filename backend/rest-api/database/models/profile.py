from email.policy import default
import enum
from tkinter import CASCADE
from sqlalchemy import Column, Enum, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from database.models import Base

class ProfileType(enum.Enum):
    admin = 'admin'
    user = 'user'

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True)
    type = Column(Enum(ProfileType))
    user_id = Column(ForeignKey('users.id'))
    user = relationship('User', back_populates='profile')
    name = Column(String, default='')
    telephone = Column(String, default='')
    email = Column(String, default='')
    address = relationship('ProfileAddress', cascade='all, delete-orphan', uselist=False)
    __mapper_args__ = {
        # "polymorphic_identity": "profile",
        "polymorphic_on": type,
    }

class AdminProfile(Profile):
    __tablename__ = "admin_profiles"
    id = Column(Integer, ForeignKey("profiles.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": ProfileType.admin,
    }

class UserProfile(Profile):
    __tablename__ = 'user_profiles'
    id = Column(Integer, ForeignKey("profiles.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": ProfileType.user,
    }