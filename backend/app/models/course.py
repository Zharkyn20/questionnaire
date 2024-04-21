from enum import Enum as ENUM

from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY, Boolean, Text
from backend.config import Base, engine
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import BYTEA



class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    file_content = Column(BYTEA, nullable=True)

    subtopics = relationship("SubTopic", back_populates="course")
    # If True will dynamically add question in the queue
    mode = Column(String, index=True)


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
    id = Column(Integer, primary_key=True)
    number = Column(Integer)
    answered = Column(Boolean, default=False)
    subtopic_id = Column(Integer, ForeignKey("subtopics.id"))
    subtopic = relationship("SubTopic", back_populates="questions")
    amount_fails = Column(Integer, default=0)

    # question
    question = Column(String, index=True)

    # question type
    # type = Column(Enum(QuestionType), nullable=True)
    type = Column(String, nullable=True)


    answers = Column(ARRAY(String), nullable=True)
    answer = Column(String, nullable=True)
    input_answer = Column(String, nullable=True)
    bool_answer = Column(Boolean, nullable=True)

    # time for answer
    time = Column(Integer, nullable=True)


Base.metadata.create_all(engine)
