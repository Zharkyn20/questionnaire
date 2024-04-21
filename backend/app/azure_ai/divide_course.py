from backend.app.chatgpt.controller import gpt


def divide_course(course):
    print("course", course)

    response = gpt.generate_chat_completion(
        messages=[
            {"role": "system", "content": "You are a virtual assistant, who analyzes the course content and divides it into topics with contents, without updating/deleting."},
            {"role": "user", "content": course.file_content}
        ],

    )
    print("response", response.choices[0].message)

    return [
        {
            "title": "Addition",
            "description": "description example",
            "course_id": course.id,
        },
        {
            "title": "Substruction",
            "description": "description example",
            "course_id": course.id,
        }
    ]