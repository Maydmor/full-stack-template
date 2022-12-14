from typing import Optional
from api.v1.schemas.api_schema import APISchema
from api.v1.schemas.address import Address
from database.models.profile import ProfileType


class ProfileUpdate(APISchema):
    name: Optional[str]
    address: Optional[Address]
    telephone: Optional[str]
    email: Optional[str]


class Profile(APISchema):
    id: int
    type: ProfileType
    name: Optional[str]
    address: Optional[Address]
    telephone: Optional[str]
    email: Optional[str]
    class Config:
        use_enum_values = True
        orm_mode = True

