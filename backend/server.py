from flask import request, jsonify, render_template
from models import *
from dbInserters import *
from compiler import *
from chatgpt import *

def problemTextFormatter(input_text):

    sections = input_text.split("-----")

    # Remove empty sections and strip whitespace
    sections = [section.strip() for section in sections if section.strip()]

    # Find the question and examples sections
    question_section = None
    examples = ""
    example_sections = []

    for i in range(0, len(sections)):
        if "QUESTION" in sections[i]:
            question_section = sections[i + 1]
        elif "EXAMPLE" in sections[i]:
            example_sections.append(sections[i + 1])
    
    for example in example_sections:
        examples = examples + example + "\n"*3

    return question_section, examples

def readingMaterialFormatter(input_text):
    
    section_titles = []
    section_content = []
    sections = input_text.split("-----")
    for i in range(0, len(sections)):
        if i % 2 != 0:
            section_titles.append(sections[i])
        else:
            if len(sections[i]) > 2:
                section_content.append(sections[i])
    return section_titles, section_content

def handle_data(json_data):

    for week_data in json_data:
        week_number = week_data['weekNumber']
        lessons = week_data['lessons']
        weekly_topics = []
        for lesson in lessons:
            lesson_number = lesson['lessonNumber']
            reading_materials = lesson['readingMaterials']
            mcqs = lesson['mcqs']
            programming_problems = lesson['programmingProblems']

            if len(reading_materials) > 2:
                titles, contents = readingMaterialFormatter(reading_materials)
                weekly_topics.append(titles)
                if len(titles) == len(contents):
                    dbInsertReadingMaterials(week_number, lesson_number, titles, contents)
                else:
                    print("FATAL ERROR. Title and Content Mismatch")

            for mcq in mcqs:
                question = mcq['question']
                choices = mcq['choices']
                correct_answer = mcq['correctAnswer']
                if len(question) > 2:
                    dbInsertMCQ(week_number, lesson_number, question, choices, correct_answer)

            for problem in programming_problems:
                if len(problem) > 2:
                    question, examples = problemTextFormatter(problem)
                    dbInsertProblem(week_number, lesson_number, question, examples)
        dbInsertWeeklyModules(week_number, lesson_number, weekly_topics)

        print("=" * 20)

app, db = initialize()

@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.get_json()
    handle_data((data))
    return jsonify(message="Data received successfully")

@app.route('/')
def index():
    materials = reading_materials.query.all()
    return render_template('index.html', students=materials)

@app.route('/compile', methods=['POST'])
def handle_submission():
    try:
        data = request.get_json()
        code = data.get('code')
        language = data.get('selectedLanguage')
        inputs = data.get('stdinInput')
        if code:
            response = compile_and_run(code, language, inputs)
            if response['stderr'] == '':
                response_data = {
                    'status': 'Accepted',
                    'output': response['stdout']
                }
            else:
                error_hint = getErrorExplanation(response['stderr'])
                response_data = {
                    'status': 'Compilation Error',
                    'error': error_hint
                }
        else:
            response_data = {
                'status': 'Error: No code provided'
            }
        
        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({'status': f'Error: {str(e)}'})

# Create the API endpoint for sign up
@app.route('/signup', methods=['POST'])
def signup():
    # Get the request body data
    data = request.get_json()

    # Check if the user already exists
    existing_user = Student.query.filter_by(email=data['email']).first()

    if existing_user:
        response=jsonify({'message': 'Email already exists.'})
        response.status_code=409
        return response

    existing_user = Student.query.filter_by(username=data['username']).first()

    if existing_user:
        response=jsonify({'message': 'Username already exists.'})
        response.status_code=409
        return response
    
    # Create a new studentnt object using the data from the request body
    new_user = Student(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        username=data['username'],
    )

    # Give the user a id not existing in the database
    new_user.id = Student.query.count() + 1

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    response=jsonify({'message': 'New user created.'})
    response.status_code=201
    return response


# Creae API endpoint for login
@app.route('/login', methods=['POST'])
def login():
    # Get the request body data
    data = request.get_json()

    # Check if the user exists
    existing_user = Student.query.filter_by(email=data['email']).first()

    if not existing_user:
        response=jsonify({'message': 'User does not exist.'})
        response.status_code=404
        return response

    # Check if the password matches
    if existing_user.password != data['password']:
        response=jsonify({'message': 'Wrong password.'})
        response.status_code=401
        return response

    # return username and email
    response = jsonify({ 'username': existing_user.username, 'email': existing_user.email })

    #response=jsonify({'message': 'User logged in.'})
    response.status_code=200
    return response


@app.route('/courses', methods=['GET'])
def fetch_courses():
    all_courses = Course.query.all()

    course_list = []
    for course in all_courses:
        course_data = {
            'course_id': course.course_id,
            'course_name': course.course_name,
            'short_description': course.short_description
        }
        course_list.append(course_data)

    return jsonify({'courses': course_list})

@app.route('/courses/check-course/<string:course_name>', methods=['GET'])
def check_course(course_name):
    course_name = course_name.strip()
    
    # Check if a course with the given course_name exists (case-insensitive)
    existing_course = Course.query.filter(func.lower(Course.course_name) == course_name.lower()).first()

    if existing_course:
        response=jsonify({'message': 'Course with the same name exists.','courseExists':'true'})
        response.status_code=200
        return response
    else:
        response=jsonify({'message': 'Course with the same name does not exist.','courseExists':'false'})
        response.status_code=404
        return response

# Create the API endpoint for retrieving course details
@app.route('/courses/<int:course_id>', methods=['GET'])
def get_course_details(course_id):
    # Query the database for the course
    queried_course = Course.query.filter_by(course_id=course_id).first()

    if not queried_course:
        response=jsonify({'error': 'Course not found.'})
        response.status_code=404
        return response

    # Convert the course object to a dictionary
    course_details = {
        'course_id': queried_course.course_id,
        'course_name': queried_course.course_name,
        'short_description': queried_course.short_description,
        'long_description': queried_course.long_description,
        'total_week': queried_course.total_week,
    }

    response=jsonify({'course': course_details})
    response.status_code=200
    return response

@app.route('/courses/mcqs/<int:course_id>/<int:week_no>/<int:lesson_id>', methods=['GET'])
def get_mcqs(course_id, week_no, lesson_id):
    # Query the database for MCQ questions
    queried_mcqs = mcqs.query.filter_by(course_id=course_id, week_no=week_no, lesson_id=lesson_id).all()

    if not queried_mcqs:
        response=jsonify({'error': 'No MCQ questions found.'})
        response.status_code=404
        return response

    # Convert the selected MCQs to a list of dictionaries
    mcq_list = [
        {
            'question': mcq.question,
            'option_1': mcq.option_1,
            'option_2': mcq.option_2,
            'option_3': mcq.option_3,
            'option_4': mcq.option_4,
            'correct': mcq.correct
        }
        for mcq in queried_mcqs
    ]

    response=jsonify({'mcqs': mcq_list})
    response.status_code=200
    return response

@app.route('/courses/reading_materials/<int:course_id>/<int:week_no>', methods=['GET'])
def get_reading_materials_prev(course_id, week_no):
    materials = reading_materials.query.filter_by(course_id=course_id, week_no=week_no).order_by(reading_materials.section_id).all()

    response_materials = []
    for material in materials:
        response_materials.append({
            'lesson_id': material.lesson_id,
            'section_title': material.section_title,
            'section_content': material.section_content
        })

    response = jsonify({'reading_materials': response_materials})
    response.status_code = 200
    return response

@app.route('/courses/reading_materials/<int:course_id>/<int:week_no>/<int:lesson_no>', methods=['GET'])
def get_reading_materials_whole(course_id, week_no, lesson_no):
    materials = reading_materials.query.filter_by(course_id=course_id, week_no=week_no, lesson_id=lesson_no).order_by(reading_materials.section_id).all()

    response_materials = []
    for material in materials:
        response_materials.append({
            'lesson_id': material.lesson_id,
            'section_title': material.section_title,
            'section_content': material.section_content,
            'section_id': material.section_id
        })

    response = jsonify({'reading_materials': response_materials})
    response.status_code = 200
    return response


@app.route('/courses/reading_materials/<int:course_id>/<int:week_no>/<int:lesson_id>', methods=['GET'])
def get_reading_materials(course_id, week_no, lesson_id):
    materials = reading_materials.query.filter_by(course_id=course_id, week_no=week_no, lesson_id=lesson_id).all()

    if not materials:
        response=jsonify({'error': 'No reading materials found.'})
        response.status_code=404
        return response

    response_materials = []
    for material in materials:
        response_materials.append({
            'section_title': material.section_title,
            'section_content': material.section_content
        })

    response=jsonify({'reading_materials': response_materials})
    response.status_code=200
    return response

# Create the API endpoint for retrieving problems based on criteria
@app.route('/courses/problems/<int:course_id>/<int:week_no>/<int:lesson_id>', methods=['GET'])
def get_problems(course_id, week_no, lesson_id):

    # Retrieve problems based on the provided criteria
    selected_problems = problems.query.filter_by(course_id=course_id, week_no=week_no, 
                                                 lesson_id=lesson_id).order_by(problems.problem_id).all()
    

    # Convert the list of problems to a list of dictionaries with examples
    problems_list = []
    for problem in selected_problems:
        example_list = []
        examples = problem.examples.split('\n\n')

        for i in range(0, len(examples) - 1, 3):
            input_value = examples[i].replace('Input:', '').strip()
            output_value = examples[i+1].replace('Output:', '').strip()
            explanation = examples[i+2].replace('Explanation:', '').strip()
            
            example_list.append({
                'Input': input_value,
                'Output': output_value,
                'Explanation': explanation
            })
        
        problems_list.append({
            'question': problem.question,
            'examples': example_list
        })

    response = jsonify({'problems': problems_list})
    response.status_code = 200
    return response



# Running app
if __name__ == '__main__':
    app.run(debug=True)
