from api.v1.schemas.api_schema import APISchema 
from pydantic import BaseModel

class LoginResponse(APISchema):
    access_token: str
    refresh_token: str

class RefreshTokenResponse(APISchema):
    access_token: str