import os
from openai import OpenAI

KEY = os.getenv("KEY")
client = OpenAI(
  api_key=KEY,
)

completion = client.chat.completions.create(
  model="gpt-4-32k-0613",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)


