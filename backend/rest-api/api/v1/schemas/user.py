from pydantic import EmailStr
from api.v1.schemas import APISchema, Profile
from database.models.profile import ProfileType


class UserCreate(APISchema):
    email: EmailStr
    password: str
    profile_type: ProfileType

class UserUpdate(APISchema):
    """user fields that are updatable """
    pass

class User(APISchema):
    email: EmailStr
    is_active: bool
    profile: Profile
    id: int
    class Config:
        orm_mode = True
