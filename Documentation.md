# Questionnaire API Docs

An AI Automated Questionnaire tool for LMS (Learning Management System).

Table of Contents
=================

   * [Course Routes](#courses)
      * [Create Course](#create-course)
      * [Get All Courses](#get-all-courses)
      * [Get Course By ID](#get-course-by-id)
      * [Subtopic Routes](#subtopic-routes)
        * [Create Subtopic](#create-subtopic)
        * [Get Subtopic by ID](#get-subtopic-by-id)
   * [Link Routes](#link-routes)
     * [Get Link](#get-link)
   * [Question Routes](#question-routes)
     * [Get Question](#get-question)
     * [Check Question](#check-question)

## Courses

### Create Course

     Method: POST
     Endpoint: /course/
     Description: Create a new course.
     Parameters:
     title (str): Title of the course.
     mode (str): Mode of the course.
     description (str, optional): Description of the course.
     file (file, optional): PDF file containing course content.
     Permissions: Requires authentication.
     Returns:
     message (str): Success message.
     course_title (str): Title of the created course.
     course_id (int): ID of the created course.
     lms_id (int): ID of the learning management system (LMS) associated with the course.

### Get All Courses
     Method: GET
     Endpoint: /course/
     Description: Retrieve all courses associated with the current user.
     Permissions: Requires authentication.
     Returns: List of dictionaries containing course details.

### Get Course by ID

     Method: GET
     Endpoint: /course/{course_id}
     Description: Retrieve details of a specific course by its ID.
     Parameters:
     course_id (int): ID of the course.
     Returns: Dictionary containing course details.

### Subtopic Routes

#### Create Subtopic

     Method: POST
     Endpoint: /subtopic/
     Description: Create a new subtopic within a course.
     Parameters:
     title (str): Title of the subtopic.
     description (str): Description of the subtopic.
     course_id (int): ID of the parent course.
     Permissions: Requires authentication.
     Returns: Success or error message.

#### Get Subtopic by ID

     Method: GET
     Endpoint: /subtopic/
     Description: Retrieve details of a specific subtopic by its ID.
     Parameters:
     subtopic_id (int): ID of the subtopic.
     Returns: Dictionary containing subtopic details.

## Link Routes

### Get Link

     Method: POST
     Endpoint: /link/
     Description: Generate a link for a test associated with a subtopic.
     Parameters:
     user_id (int): ID of the user.
     course_id (int): ID of the course.
     subtopic_id (int): ID of the subtopic.
     question_amount (int, optional): Number of questions in the test.
     Permissions: Requires authentication.
     Returns: Dictionary containing the test URL.

## Question Routes

### Get Question

     Method: GET
     Endpoint: /question/
     Description: Retrieve a question from a test associated with a subtopic.
     Parameters:
     token (str): Token for accessing the test.
     Returns: Question details.
     Check Question

### Check Question
     Method: POST
     Endpoint: /question/check/
     Description: Check the answer to a question in a test.
     Parameters:
     question_id (int): ID of the question.
     answer (str, optional): Answer to the question.
     answers (list of str, optional): List of answers for multiple-choice questions.
     input_answer (str, optional): Input answer for questions requiring textual input.
     bool_answer (bool, optional): Boolean answer for true/false questions.
     Permissions: Requires authentication.
     Returns: Result of the answer check.
