from settings import AuthSettings, DatabaseSettings, AppSettings
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from api.v1 import users_router, security_router
from database import setup_database
import logging
import logging.config
import yaml

with open('./log-config.yaml', 'r') as stream:
    config = yaml.load(stream, Loader=yaml.FullLoader)
logging.config.dictConfig(config)
logger = logging.getLogger(__name__)
logger.info('Setup app')
logger.info(f'connect to to database: {DatabaseSettings().database_uri}')
setup_database()

app = FastAPI(servers=[
    {
        'url': f'http://{AppSettings().app_host}:{AppSettings().app_port}' 
    }
])

allowed_origins = [
    f'http://{AppSettings().app_host}',
    f'https://{AppSettings().app_host}',
    f'http://{AppSettings().app_host}:{AppSettings().app_port}',
    f'https://{AppSettings().app_host}:{AppSettings().app_port}',
    f'http://localhost:5173',
    f'http://127.0.0.1:5173',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix='/users', tags=['User'])
app.include_router(security_router, tags=['Security'])

@AuthJWT.load_config
def get_config():
    return AuthSettings()

@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )

