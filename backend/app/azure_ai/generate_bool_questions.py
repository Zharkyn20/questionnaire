from backend.app.models.course import Question
from backend.app.models.course import QuestionType
from backend.app.backend.config import get_db_session
from sqlalchemy.orm import Session
from fastapi import Depends

from chatgpt.controller import gpt


# genearte questions for subtopic(now simple version)
def generate_bool_questions(amount, subtopic_id, description, user_id, session: Session = Depends(get_db_session)):
    # Logik with azure AI to generate questions

    response = gpt.generate_chat_completion(
        messages=[
            {"role": "system",
             "content": "You are a virtual assistant, who splits the course content into topics without changing topic description. The response should be a list of objects (number, title, content)"},
            {"role": "user", "content": description}
        ],
    )

    print("response", response)
    print("response.content", response.content)

    for i in range(amount):
        question = Question(
            number=i,
            answered=False,
            subtopic_id=subtopic_id,
            question=f"my question with number {i} is ->  what is ypu name? (correct answer is 19)",
            type="single",
            answer="19",
            time=9,
            variants=["20", "90", "19", "99"],
            user_id=user_id,
            answers=None,
        )
        session.add(question)
        session.commit()
    return True
