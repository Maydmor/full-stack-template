from typing import Optional
from api.v1.schemas.api_schema import APISchema


class Address(APISchema):
    zip_code: Optional[str]
    street_name: Optional[str]
    street_number: Optional[str]
    class Config:
        orm_mode = True
