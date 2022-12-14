from api.v1.dependencies.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from database.models.user import User
import database.services.user as user_service

def user_by_email(email: str, db: Session = Depends(get_db))->User:
    """Dependency to get a user by email or throw an HTTPException if user was not found

    Args:
        email (str): email of the user
    Raises:
        HTTPException: 404 if user was not found
    Returns:
        DBUser: user in database
    """
    user = user_service.get_user_by_email(db, email)
    if user is None:
        raise HTTPException(status_code=404, detail=f'could not find user with email {email}')
    return user