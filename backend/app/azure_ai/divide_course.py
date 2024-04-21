import json
import ast

from backend.app.azure_ai.generate_question import delete_word_at_start
from backend.app.chatgpt.controller import gpt


def divide_course(course, course_content):
    print("course", course)

    response = gpt.generate_chat_completion(
        messages=[
            {"role": "system", "content": "You are a virtual assistant, who splits the course content into topics without changing topic description. "
                                          "The full response should be a valid python list of dictionaries without any string and data(number, title, content)"},
            {"role": "user", "content": course_content}
        ],
    )

    print("response", response)
    print("response.content", response.content)

    response_content = response.content

    word_to_delete = "python"
    valid_data = delete_word_at_start(str(response_content), word_to_delete)
    print("valid_data", valid_data)

    subtopics = parse_content(response.content, course.id)
    return subtopics


def parse_content(data, course_id):
    data = json.loads(str(data))
    # print("data", data)
    # print(type(data))
    subtopics = []
    for item in data:
        item["title"] = ast.literal_eval(str(item))["title"]
        item["description"] = ast.literal_eval(str(item))["content"]
        item["course_id"] = course_id
        subtopics.append(item)

    return data
