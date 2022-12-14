import enum
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, DateTime, func
from sqlalchemy.orm import relationship
from database.models import Base

class AddressType(enum.Enum):
    profile = 'profile'

class Address(Base):
    __tablename__ = 'addresses'
    id = Column(Integer, primary_key=True)
    country = Column(String)
    state = Column(String)
    city = Column(String)
    zip_code = Column(String)
    street_name = Column(String)
    street_number = Column(String)
    type = Column(Enum(AddressType), nullable=False)
    __mapper_args__ = {
        "polymorphic_on": type,
    }

class ProfileAddress(Address):
    __tablename__ = 'profile_addresses'
    id = Column(Integer, ForeignKey('addresses.id'), primary_key=True)
    profile_id = Column(Integer, ForeignKey('profiles.id'))
    __mapper_args__ = {
        "polymorphic_identity": AddressType.profile
    }
