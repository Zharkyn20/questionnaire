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
            question=f"my question with number {i} is ->  what is ypu name? (correct answer is 19)",
            type="single",
            answer="19",
            time=9,
            answers=["20", "90", "19", "99"]
        )
        session.add(question)
        session.commit()
    return True
