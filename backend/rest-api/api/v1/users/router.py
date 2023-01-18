from typing import List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request, Response, status
from database.models import User as DBUser
from database.models.profile import ProfileType
from database.services import user_service, profile_service
from api.v1.schemas import ProfileUpdate, User, UserCreate, UserUpdate
from api.v1.dependencies import get_db, user_by_email, check_admin, require_user
from sqlalchemy.orm import Session
import services.email as email_service
from fastapi_jwt_auth import AuthJWT
from security.rate_limit import limiter
import logging
logger = logging.getLogger(__name__)
router = APIRouter()

@router.get('',  response_model=List[User], operation_id='get_users', response_model_exclude_none=True)
def get_users(db: Session = Depends(get_db)):
    logger.info('get users')
    return user_service.get_users(db)

@router.post('', response_model=User, operation_id='create_user', response_model_exclude_none=True)
async def create_user(user: UserCreate, db: Session = Depends(get_db), Authorize: AuthJWT = Depends())->User:
    logger.info(f'create user {user}')
    Authorize.jwt_optional()
    current_user_email = Authorize.get_jwt_subject() or "anonymous"
    current_user = user_service.get_user_by_email(db, current_user_email)
    if user_service.get_user_by_email(db, user.email):
        raise HTTPException(status_code=409, detail=f'an user with the given email already exists')
    if user.profile_type == ProfileType.admin:
        if current_user is None:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
        if current_user.profile.type != ProfileType.admin:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    new_user = user_service.create_user(db, email=user.email, password=user.password)
    profile_service.create_profile(db, user_id=new_user.id, type=user.profile_type, name=user.email.split('@')[0], telephone='+43', email=user.email)
    db.refresh(new_user)
    return new_user

@router.patch('/{email}', response_model=User, operation_id='update_user', response_model_exclude_none=True)
def patch_user(user_update_fields: UserUpdate, update_user: DBUser = Depends(user_by_email), check_admin_ret: tuple[bool, User] = Depends(check_admin), db: Session = Depends(get_db)):
    is_admin = check_admin_ret[0]
    user = check_admin_ret[1]
    if user is None or (not is_admin and user.id != update_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f'only the owner or an admin can update this ressource')
    updated_user = user_service.update_user(db, update_user, user_update_fields)
    return updated_user
    

@router.delete('/{email}', response_model=User, operation_id='delete_user', response_model_exclude_none=True)
def delete_user(delete_user: DBUser = Depends(user_by_email), check_admin_ret: tuple[bool, User] = Depends(check_admin), db: Session = Depends(get_db)):
    deleted_user = User.from_orm(delete_user)
    is_admin = check_admin_ret[0]
    user = check_admin_ret[1]
    if user is None or (not is_admin and user.id != delete_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f'only the owner or an admin can delete this ressource')
    user_service.delete_user(db, delete_user)
    return deleted_user

@router.get('/me', response_model=User, operation_id='get_current_user', response_model_exclude_none=True)
def get_current_user(user: DBUser = Depends(require_user)):
    return user


@router.get('/{email}/activate', operation_id='activate_user')
def activate_user(user_to_activate: DBUser = Depends(user_by_email), user: DBUser = Depends(require_user), db: Session = Depends(get_db)):
    if user.id != user_to_activate.id and user.profile.type != ProfileType.admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    active_user = user_service.update_user(db, user_to_activate, {'is_active': True})
    return f'User {active_user.email} succesfully activated'

@router.get('/{email}', response_model=User, operation_id='get_user', response_model_exclude_none=True)
def get_user(user: DBUser = Depends(user_by_email)):
    return user

@router.post('/{email}/activation-email', operation_id='send_activation_email')
# @limiter.limit('1/minute')
def send_activation_email(request: Request, background_tasks: BackgroundTasks, recipient_user: DBUser = Depends(user_by_email)):
    background_tasks.add_task(email_service.send_activation_email, recipient_user.email)
    return Response(status_code=status.HTTP_202_ACCEPTED)
