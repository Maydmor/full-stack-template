from datetime import timedelta
from pydantic import BaseModel, PostgresDsn, BaseSettings
import humps
from pydantic_computed import Computed, computed
HOSTNAME = 'localhost'
PORT = 8000


class Settings(BaseSettings):
    class Config:
        env_file = '.env', '.env.prod'

class AppSettings(Settings):
    app_host: str = HOSTNAME
    app_port: int = PORT

class DatabaseSettings(Settings):
    database_username: str
    database_password: str
    database_name: str
    database_uri: Computed[PostgresDsn]
    @computed('database_uri')
    def compute_database_uri(database_username: str, database_password: str, database_name: str):
        return f'postgresql+psycopg2://{database_username}:{database_password}@database:5432/{database_name}'

class AuthSettings(Settings):
    """The authentication settings"""
    authjwt_secret_key: str
    authjwt_access_token_expires: timedelta = timedelta(minutes=15)
    authjwt_refresh_token_expires: timedelta = timedelta(days=30)

class EmailSettings(Settings):
    email_server_username: str
    email_server_password: str
    email_sender: str
    email_server_port: int
    email_server_hostname: str
    email_enable_tls: bool = False
    email_enable_ssl: bool = True

class ModelConfigSettings(BaseModel):
    alias_generator = lambda s: humps.camelize(s) #generate for all pydantic schema fields alias names that are in camel case 
