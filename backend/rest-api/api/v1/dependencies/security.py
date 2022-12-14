from api.v1.dependencies import get_db
from fastapi_jwt_auth import AuthJWT 
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database.services import user_service
from database.models import ProfileType, User
from fastapi.security import OAuth2PasswordBearer
from logging import getLogger
logger = getLogger(__name__)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def check_admin(token: str = Depends(oauth2_scheme), Authorize: AuthJWT = Depends(), db: Session = Depends(get_db))->tuple[bool, User|None]:
    Authorize.jwt_optional(token=token)
    current_user_email = Authorize.get_jwt_subject() or 'anonymous'
    user = user_service.get_user_by_email(db , current_user_email)
    if user is None:
        return (False, None)
    return (user.profile.type == ProfileType.admin, user)
    
def require_admin(check_admin_ret: tuple[bool, User] = Depends(check_admin))->User:
    is_admin = check_admin_ret[0]
    if not is_admin:
        raise HTTPException(status_code=403, detail=f'this operation is only permitted for admins')
    admin = check_admin_ret[1]
    return admin

def require_user(token: str = Depends(oauth2_scheme), Authorize: AuthJWT = Depends(),  db: Session = Depends(get_db))->User:
    logger.info(f'Check token {token}')
    Authorize.jwt_required()
    logger.info('after required')
    current_user_email = Authorize.get_jwt_subject()
    logger.info(f'token mail: {current_user_email}')
    user = user_service.get_user_by_email(db, current_user_email)
    if user is None:
        raise HTTPException(status_code=401, detail=f'invalid access token')
    return user