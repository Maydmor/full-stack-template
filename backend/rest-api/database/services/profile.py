from typing import Dict, List, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.models import Profile, ProfileType, ProfileAddress, UserProfile, AdminProfile

class ProfileUpdateFields(BaseModel):
    name: Optional[str]
    telephone: Optional[str]
    email: Optional[str]
    contact_person: Optional[str]
    address: Optional[dict] = {}

def get_profile_by_id(db: Session, profile_id: int):
    return db.query(Profile).get(profile_id)

def update_profile(db: Session, profile: Profile, update_fields: BaseModel|Dict):
    profile_update_fields = ProfileUpdateFields.parse_obj(update_fields)
    address_fields = profile_update_fields.address
    if address_fields is None:
        address_fields = {}
    fields = profile_update_fields.dict()
    fields.pop('address')
    for k,v in address_fields.items():
        setattr(profile.address, k, v)
    for k,v in fields.items():
        setattr(profile, k, v)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

def get_profiles(db: Session, skip: Optional[int] = None , limit: Optional[int] = None, filters: Optional[List] = None)->List[Profile]:
    query = db.query(Profile)
    if skip != None:
        query = query.offset(skip)
    if limit != None:
        query = query.limit(limit)
    if filters != None:
        query = query.filter(*filters)
    return query.all()

def create_profile(db: Session, user_id: int, type: ProfileType, name: str, telephone: str, email: str):
    if type == ProfileType.admin:
        profile = AdminProfile(name=name, telephone=telephone, email=email, user_id=user_id)
    else:
        profile = UserProfile(name=name, telephone=telephone, email=email, user_id=user_id)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

