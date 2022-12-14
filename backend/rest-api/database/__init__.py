from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from settings import DatabaseSettings
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine(
    DatabaseSettings().database_uri
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def setup_database():
    Base.metadata.create_all(bind=engine)