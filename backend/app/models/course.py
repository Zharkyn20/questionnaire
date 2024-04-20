from sqlalchemy import Column, Integer, String
from backend.config import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)

