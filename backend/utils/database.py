from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from service.config.env import env

SQL_URL = env.DB_URL
engine = create_engine(SQL_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_db_service():
    db = SessionLocal()
    return db

print("DB connected successfully")
