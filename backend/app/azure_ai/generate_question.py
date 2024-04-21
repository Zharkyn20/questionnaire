import random
from backend.app.models.course import Question
from backend.app.backend.config import get_db_session
from sqlalchemy.orm import Session
from fastapi import Depends
from backend.app.chatgpt.controller import gpt
import json
import ast


def delete_word_at_start(sentence, word):
    if sentence.startswith(word):
        return sentence[len(word):].lstrip()  # Remove the word and any leading whitespace
    return sentence


# genearte questions for subtopic(now simple version)
def generate_question(amount, subtopic_id, description, user_id, session: Session = Depends(get_db_session)):
    # Logik with azure AI to generate questions

    response = gpt.generate_chat_completion(
        messages=[
            {"role": "system",
             "content": f"You are a virtual assistant, who creates {amount} questions with 3 incorrect and 1 correct answer."
                        f"All incorrect answers mustn't be the same."
                        " The full response should be a valid python list of dictionaries without any string and data"
                        "(question_text, incorrect_answer_1, incorrect_answer_2, incorrect_answer_3, correct_answer) every key in dict should be in double quotes"},
            {"role": "user", "content": description}
        ],
    )

    response_content = response.content

    word_to_delete = "python"
    valid_data = delete_word_at_start(str(response_content), word_to_delete)


    data = json.loads(str(valid_data))


    # print(data)
    counter = 0
    for q in data:
        random_number = random.randint(0, 3)
        variants = [0] * 4
        count = 1
        for i in range(4):
            if i == random_number:
                variants[i] = ast.literal_eval(str(q))["correct_answer"]
            else:
                variants[i] = ast.literal_eval(str(q))["incorrect_answer_" + str(count)]
                count += 1

        question = Question(
            number=counter,
            answered=False,
            subtopic_id=subtopic_id,
            question=ast.literal_eval(str(q))["question_text"],
            type="single",
            answer=ast.literal_eval(str(q))["correct_answer"],
            time=9,
            variants=variants,
            user_id=user_id,
            answers=None,
        )
        counter += 1
        session.add(question)
        session.commit()

    return True


def generate_question_boolean(amount, subtopic_id, description, user_id, session: Session = Depends(get_db_session)):

    response = gpt.generate_chat_completion(
        messages=[
            {"role": "system",
             "content": f"You are a virtual assistant, who creates {amount} questionsin boolean format where will be answer true or false."
                        " The full response should be a valid python list of dictionaries without any string and data"
                        "(question_text, answer) every key in dict should be in double quotes"},
            {"role": "user", "content": description}
        ],
    )

    response_content = response.content

    word_to_delete = "python"
    valid_data = delete_word_at_start(str(response_content), word_to_delete)

    data = json.loads(str(valid_data))

    counter = 0
    for q in data:
        print(ast.literal_eval(str(q))["question_text"])
        print(bool(ast.literal_eval(str(q))["answer"]))

        question = Question(
            number=counter,
            answered=False,
            subtopic_id=subtopic_id,
            question=ast.literal_eval(str(q))["question_text"],
            type="bool",
            time=9,
            user_id=user_id,
            answers=None,
            bool_answer=bool(ast.literal_eval(str(q))["answer"]),
        )
        counter += 1
        session.add(question)
        session.commit()

    return True




