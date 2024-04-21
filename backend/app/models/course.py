from enum import Enum as ENUM
from sqlalchemy import Sequence
from sqlalchemy import ForeignKey, ARRAY, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String
from sqlalchemy import UniqueConstraint
from backend.app.backend.config import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, default="")
    usercourses = relationship("UserCourse", back_populates="user")
    userquestions = relationship("Question", back_populates="user")




class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    subtopics = relationship("SubTopic", back_populates="course")
    # If True will dynamically add question in the queue
    mode = Column(String, index=True)
    usercourses = relationship("UserCourse", back_populates="course")


class UserCourse(Base):
    __tablename__ = "usercourses"

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('courses.id'), primary_key=True)
    user = relationship("User", back_populates="usercourses")
    course = relationship("Course", back_populates="usercourses")


class SubTopic(Base):
    __tablename__ = "subtopics"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="subtopics")
    questions_amount = Column(Integer, default=10)
    questions = relationship("Question", back_populates="subtopic")
    questions_generated = Column(Boolean, default=False)
    current_question = Column(Integer, default=0)
    public_key = Column(String, index=True, default="")
    private_key = Column(String, index=True, default="")


class QuestionType(ENUM):
    MULTIPLE = "multiple"
    BOOLEAN = "boolean"
    SINGLE = "single"
    INPUT = "input"


class Question(Base):
    __tablename__ = "questions"

    # question identity
    id = Column(Integer, Sequence('question_id_seq'), primary_key=True)
    number = Column(Integer)
    answered = Column(Boolean, default=False)
    subtopic_id = Column(Integer, ForeignKey("subtopics.id"))
    subtopic = relationship("SubTopic", back_populates="questions")
    amount_fails = Column(Integer, default=0)

    # question
    question = Column(String, index=True)

    # question type
    type = Column(String, nullable=True)

    variants = Column(ARRAY(String), nullable=True)
    answer = Column(String, nullable=True)
    answers = Column(ARRAY(String), nullable=True)
    input_answer = Column(String, nullable=True)
    bool_answer = Column(Boolean, nullable=True)

    # time for answer
    time = Column(Integer, nullable=True)

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    user = relationship("User", back_populates="userquestions")
