from models.course import Course
from backend.config import session
from fastapi import (
    APIRouter,
)

router = APIRouter(prefix="/" + "courses")


@router.get("/create")
async def create_course(title: str, description: str):
    course = Course(title=title, description=description)
    session.add(course)
    session.commit()
    return {"course added": course.title}


@router.get("/get")
async def get_all_courses():
    courses_query = session.query(Course)
    return courses_query.all()
