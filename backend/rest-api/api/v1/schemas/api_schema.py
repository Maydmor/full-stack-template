from pydantic import BaseModel
from settings import ModelConfigSettings

class APISchema(BaseModel):
    class Config:
        alias_generator = ModelConfigSettings.alias_generator
        allow_population_by_field_name = True
