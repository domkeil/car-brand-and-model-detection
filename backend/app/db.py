import os
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:password@localhost/car_detection")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    top_prediction = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    top5_json = Column(JSON, nullable=True)
    brand = Column(String, nullable=True)
    model_name = Column(String, nullable=True)
    year = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


def create_tables():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
