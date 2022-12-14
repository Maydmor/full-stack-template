from api.v1.schemas.api_schema import APISchema
from pydantic import EmailStr

class Credentials(APISchema):
    email: EmailStr
    password: str