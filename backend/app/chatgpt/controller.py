from openai import OpenAI

from backend.app.backend.config import openai_api_key


class GPT:
    def __init__(self):
        self.client = OpenAI(api_key=openai_api_key)

    def generate_chat_completion(self, messages):
        completion = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return completion.choices[0].message

    def generate_quiz_completion(self, messages):
        completion = self.client.gpt_quiz.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return completion.choices[0].message


gpt = GPT()

# completion = client.chat.completions.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
#     {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
#   ]
# )
#
# print(completion.choices[0].message)