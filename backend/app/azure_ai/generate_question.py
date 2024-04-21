from backend.app.models.course import Question
from backend.app.models.course import QuestionType
from backend.app.backend.config import get_db_session
from sqlalchemy.orm import Session
from fastapi import Depends

# genearte questions for subtopic(now simple version)
def generate_question(amount, subtopic_id, description, session: Session = Depends(get_db_session)):
    # Logik with azure AI to generate questions

    for i in range(amount):
        question = Question(
            number=i,
            subtopic_id=subtopic_id,
            question=f"my question with number {i} is ->  what is ypu name? (correct answer is 19)",
            type="single",
            answer="19",
            time=9,
            answers=["20", "90", "19", "99"]
        )
        session.add(question)
        session.commit()
    return True
