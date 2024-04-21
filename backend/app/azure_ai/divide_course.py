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

    parsed_content = parse_content(response.content)
    list_of_subtopics = []
    for content in parsed_content:
        list_of_subtopics.append({
            "title": content["title"],
            "description": content["description"],
            "course_id": course.id,
        })

    print("list_of_subtopics", list_of_subtopics)
    return list_of_subtopics


def parse_content(content):
    sections = content.split("\n\n")
    parsed_sections = []
    for section in sections:
        if section.strip():
            # Extract title
            title_start_index = section.find(". ")
            title_end_index = section.find("\n", title_start_index)
            title = section[title_start_index:title_end_index].strip()

            # Extract content
            content_start_index = section.find("\n") + len("\n")
            content_text = section[content_start_index:].strip()

            parsed_sections.append({
                "title": title,
                "description": content_text,
            })
    return parsed_sections
