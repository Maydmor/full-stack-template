from api.v1.schemas.credentials import Credentials
from api.v1.dependencies.database import get_db
from .response_schemas import LoginResponse, RefreshTokenResponse
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_jwt_auth import AuthJWT
from sqlalchemy.orm import Session
from database.services.user import get_user_by_email
from security.password_util import verify_password
router = APIRouter()

INVALID_CREDENTIALS_EXCEPTION = HTTPException(status_code=401, detail='invalid login credentials')

@router.post('/login', response_model=LoginResponse)
def login(credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, credentials.username)
    if user is None:
        raise INVALID_CREDENTIALS_EXCEPTION
    if not verify_password(credentials.password, user.hashed_password):
        raise INVALID_CREDENTIALS_EXCEPTION
    Authorize = AuthJWT()
    access_token = Authorize.create_access_token(subject=credentials.username)
    refresh_token = Authorize.create_refresh_token(subject=credentials.username)
    return LoginResponse(access_token=access_token, refresh_token=refresh_token)

@router.post('/refresh')
def refresh(Authorize: AuthJWT = Depends()):
    """
    The jwt_refresh_token_required() function insures a valid refresh
    token is present in the request before running any code below that function.
    we can use the get_jwt_subject() function to get the subject of the refresh
    token, and use the create_access_token() function again to make a new access token
    """
    Authorize.jwt_refresh_token_required()
    user_email = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=user_email)
    return RefreshTokenResponse(access_token=new_access_token)