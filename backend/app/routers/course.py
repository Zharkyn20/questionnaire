from sqlite3 import IntegrityError
from typing import List
from backend.app.models.course import Course, SubTopic, Question, User, UserCourse
from backend.app.backend.config import get_db_session
from sqlalchemy.orm import joinedload
from backend.app.azure_ai.generate_question import generate_question
from backend.app.azure_ai.generate_link import get_test_link
from backend.app.azure_ai.generate_link import open_token
from backend.app.azure_ai.check_input import check_input
from backend.app.azure_ai.divide_course import divide_course
from fastapi import HTTPException, File, UploadFile
import io
import PyPDF2
from sqlalchemy.orm import Session

from fastapi import (
    APIRouter, Depends,
)

router = APIRouter()


# Course Logic
@router.post("/course/", tags=["courses"])
async def create_course(title: str, mode: str, description: str = "",
                        file: UploadFile = File(None), session: Session = Depends(get_db_session)):

    try:
        if file is not None:
            content = await file.read()
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
            all_text = ""
            for page_num in range(len(pdf_reader.pages)):
                all_text += ' '.join(pdf_reader.pages[page_num].extract_text().split("\n")) + "\n"

            course = Course(title=title, description=description, mode=mode)
        else:
            course = Course(title=title, description=description, mode=mode)

        session.add(course)
        session.commit()

        #Divide course on topics
        subtopics = divide_course(course)

        for subtopic in subtopics:
            obj = SubTopic(title=subtopic["title"], description=subtopic["description"], course_id=subtopic["course_id"])
            session.add(obj)
            session.commit()


        return {
            "message": "Course created",
            "course_title": course.title,
            "course_id": course.id,
        }
    except Exception as e:
        session.rollback()
        return {
            "error": f"Failed to create course: {str(e)}"
        }


@router.get("/course/", tags=["courses"])
async def get_all_courses(session: Session = Depends(get_db_session)):
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


@router.get("/course/{course_id}", tags=["courses"])
async def get_course(course_id: int, session: Session = Depends(get_db_session)):
    course = session.query(Course).filter(Course.id == course_id).options(joinedload(Course.subtopics)).first()

    if course is None:
        return {"Error": "Course not found"}

    course_dict = {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "subtopics": [subtopic.id for subtopic in course.subtopics]
    }

    return course_dict


# SubTopic Logik

# There цe receive data about the course and generate questions for it
@router.post("/subtopic/", tags=["subtopics"])
async def create_subtopic(title: str, description: str, course_id: int, session: Session = Depends(get_db_session)):
    course = session.query(Course).filter(Course.id == course_id).first()
    if course is None:
        return {
            "error": "Course not found"
        }

    try:
        subtopic = SubTopic(title=title, description=description, course_id=course_id)
        session.add(subtopic)
        session.commit()

        return {
            "message": "Subtopic created", "subtopic_title": subtopic.title
        }
    except IntegrityError:
        session.rollback()
        return {
            "error": "Failed to create subtopic"
        }


@router.get("/subtopic/", tags=["subtopics"])
async def get_subtopic(subtopic_id: int, session: Session = Depends(get_db_session)):
    subtopic = session.query(SubTopic).filter(SubTopic.id == subtopic_id).first()

    if not subtopic:
        raise HTTPException(status_code=404, detail="Subtopic not found")

    return subtopic


# Link Logik
@router.post("/link/", tags=["link"])
async def get_link(user_id: int, course_id: int, subtopic_id: int, question_amount: int = 10, session: Session = Depends(get_db_session)):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        # add in future check for user correctness
        user = User(id=user_id)
        session.add(user)
        session.commit()

    usercourse = (session.query(UserCourse).filter(UserCourse.user_id == user_id)
                  .filter(UserCourse.course_id == course_id).first())

    if usercourse is None:
        usercourse = UserCourse(user_id=user_id, course_id=course_id)
        session.add(usercourse)
        session.commit()

    subtopic = session.query(SubTopic).filter(SubTopic.id == subtopic_id).first()
    if subtopic is None:
        return {"error": "Course not found"}

    subtopic.questions_amount = question_amount
    session.commit()

    generated = generate_question(question_amount, subtopic.id, subtopic.description, user_id, session)

    if generated:
        subtopic.questions_generated = True
        session.commit()

    return {
        "url": "fronlink/" + str(get_test_link(subtopic_id)),
    }


# Question Logik
@router.get("/question/", tags=["question"])
async def get_question(token: str, session: Session = Depends(get_db_session)):
    subtopic_id = int(open_token(int(token)))

    subtopic = session.query(SubTopic).filter(SubTopic.id == subtopic_id).options(
        joinedload(SubTopic.questions)).first()

    if subtopic is None:
        return {"error": "Course not found"}

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
    bool_answer: bool = False,
    session: Session = Depends(get_db_session)
):

    question = session.query(Question).filter(Question.id == question_id).first()

    subtopic = session.query(SubTopic).filter(SubTopic.id ==question.subtopic_id).first()
    course = session.query(Course).filter(Course.id == (subtopic.course_id)).first()

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
        if course.mode == "dynamic":
            question.amount_fails += 1
            question.number = subtopic.questions_amount
            subtopic.questions_amount += 1
        # else:
            # continue logik for future modes

    session.commit()

    return {
        "question_id": question_id,
        "answer": result,
        "description": description,
    }
