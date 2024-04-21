from sqlalchemy.orm import Session

from fastapi import (
    APIRouter, Depends,
)

from backend.app.backend.config import get_db_session
from backend.app.models import Course

router = APIRouter(prefix="/" + "courses")


@router.get("/create")
async def create_course(title: str, description: str, db: Session = Depends(get_db_session)):
    course = Course(title=title, description=description)
    db.add(course)
    db.commit()
    return {"course added": course.title}


@router.get("/get")
async def get_all_courses(db: Session = Depends(get_db_session)):
    courses_query = db.query(Course)
    return courses_query.all()
