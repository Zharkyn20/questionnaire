from backend.app.chatgpt.controller import gpt


def divide_course(course, course_content):
    print("course", course)

    response = gpt.generate_chat_completion(
        messages=[
            {"role": "system", "content": "You are a virtual assistant, who splits the course content into topics without changing topic description. The response should be a list of objects (number, title, content)"},
            {"role": "user", "content": course_content}
        ],
    )

    print("response", response)
    print("response.content", response.content)\

    parsed_content = parse_content(response.content)
    list_of_subtopics = []
    for content in parsed_content:
        list_of_subtopics.append({
            "title": content["title"],
            "description": content["description"],
            "course_id": course.id,
        })

    return list_of_subtopics


def parse_content(content):
    sections = content.split("\n\n")
    parsed_sections = []
    for section in sections:
        if section.strip():
            # Extract title
            title_start_index = section.find(" ")
            title = section[:title_start_index].strip()

            # Extract content
            content_start_index = section.find("\n") + len("\n")
            content_text = section[content_start_index:].strip()

            parsed_sections.append({
                "title": title,
                "description": content_text,
            })
    return parsed_sections
