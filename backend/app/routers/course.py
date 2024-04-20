from sqlite3 import IntegrityError
from typing import List

from models.course import Course, SubTopic, Question
from backend.config import session
from sqlalchemy.orm import joinedload
from azure_ai.generate_question import generate_question
from azure_ai.generate_link import get_test_link
from azure_ai.generate_link import open_token
from azure_ai.check_input import check_input
from fastapi import HTTPException


from fastapi import (
    APIRouter,
)

router = APIRouter()


# Course Logic
@router.post("/course/create/", tags=["courses"])
async def create_course(title: str, description: str):
    try:
        course = Course(title=title, description=description)
        session.add(course)
        session.commit()

        return {
            "message": "Course created",
            "course_title": course.title
        }
    except Exception as e:
        session.rollback()
        return {
            "error": f"Failed to create course: {str(e)}"
        }


@router.get("/course/get/", tags=["courses"])
async def get_all_courses():
    courses_query = session.query(Course).options(joinedload(Course.subtopics))
    courses = courses_query.all()

    courses_dict = []
    for course in courses:
        course_dict = {
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "subtopics": [subtopic.title for subtopic in course.subtopics]
        }
        courses_dict.append(course_dict)

    return courses_dict


@router.get("/course/get/", tags=["courses"])
async def get_course(course_id: int):
    course = session.query(Course).filter(Course.id == course_id).options(joinedload(Course.subtopics)).first()

    if course is None:
        return {"Error": "Course not found"}

    course_dict = {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "subtopics": [subtopic.title for subtopic in course.subtopics]
    }

    return course_dict


# SubTopic Logik

# There цe receive data about the course and generate questions for it
@router.post("/subtopic/create/", tags=["subtopics"])
async def create_subtopic(title: str, description: str, course_id: int, question_amount: int = 10):
    course = session.query(Course).filter(Course.id == course_id).first()
    if course is None:
        return {
            "error": "Course not found"
        }

    try:
        subtopic = SubTopic(title=title, description=description, course_id=course_id, questions_amount=question_amount)
        session.add(subtopic)
        session.commit()

        generated = generate_question(question_amount, subtopic.id, description)

        if generated:
            subtopic.questions_generated = True
            session.commit()

        return {
            "message": "Subtopic created", "subtopic_title": subtopic.title
        }
    except IntegrityError:
        session.rollback()
        return {
            "error": "Failed to create subtopic"
        }


@router.get("/subtopic/get/", tags=["subtopics"])
async def get_subtopic(subtopic_id: int):
    subtopic = session.query(SubTopic).filter(SubTopic.id == subtopic_id).first()

    if not subtopic:
        raise HTTPException(status_code=404, detail="Subtopic not found")

    return subtopic

# Link Logik
@router.post("/link/create/", tags=["link"])
async def get_link(user_id: int):
    link = get_test_link(user_id)
    return {
        "url": link,
    }


# Question Logik
@router.get("/question/get/", tags=["question"])
async def get_question(token: int):
    # пока что токен = айди подтемы
    subtopic_id = int(open_token(token))

    subtopic = session.query(SubTopic).filter(SubTopic.id == subtopic_id).options(
        joinedload(SubTopic.questions)).first()

    if subtopic.current_question == subtopic.questions_amount:
        return {"message": "Test finished"}

    question = session.query(Question).filter(Question.subtopic_id == subtopic_id, Question.number == subtopic.current_question).first()
    return question


@router.post("/question/check/", tags=["question"])
async def check_question(
    question_id: int,
    answer: str = "",
    answers: List[str] = None,
    input_answer: str = "",
    bool_answer: bool = False
):

    question = session.query(Question).filter(Question.id == question_id).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    result = "fail"
    description = "none"
    if question.type == "single":
        if question.answer == answer:
            result = "success"
    elif question.type == "multiple":
        result = "success"
        for ans in answers:
            if ans not in question.answers:
                result = "fail"
                break
    elif question.type == "boolean":
        if bool(bool_answer) == bool(question.bool_answer):
            result = "success"
    elif question.type == "input":
        check_result = check_input(input_answer, question)
        result = "success" if check_result["result"] else "fail"
        description = check_result["description"]
    else:
        raise HTTPException(status_code=400, detail="Invalid question type")

    subtopic = session.query(SubTopic).filter(SubTopic.id == question.subtopic_id).first()
    subtopic.current_question += 1

    if result == "success":
        question.answered = True
    else:
        question.amount_fails += 1
        question.number = subtopic.questions_amount
        subtopic.questions_amount += 1

    session.commit()

    return {
        "question_id": question_id,
        "answer": result,
        "description": description,
    }
