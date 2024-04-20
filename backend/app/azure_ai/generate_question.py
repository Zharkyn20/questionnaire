from models.course import Question
from models.course import QuestionType
from backend.config import session

# genearte questions for subtopic(now simple version)
def generate_question(amount, subtopic_id, description):
    # Logik with azure AI to generate questions

    for i in range(amount):
        question = Question(
            number=i,
            subtopic_id=subtopic_id,
            question="text",
            type="single",
            answer="answer",
            time=9,
        )
        session.add(question)
        session.commit()
    return True
