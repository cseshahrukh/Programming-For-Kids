from flask import request, jsonify, render_template
from models import *
from dbInserters import *
from compiler import *
from chatgpt import *
from sqlalchemy import or_


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
                    dbInsertReadingMaterials(
                        week_number, lesson_number, titles, contents)
                else:
                    print("FATAL ERROR. Title and Content Mismatch")

            for mcq in mcqs:
                question = mcq['question']
                choices = mcq['choices']
                correct_answer = mcq['correctAnswer']
                if len(question) > 2:
                    dbInsertMCQ(week_number, lesson_number,
                                question, choices, correct_answer)

            for problem in programming_problems:
                if len(problem) > 2:
                    question, examples = problemTextFormatter(problem)
                    dbInsertProblem(week_number, lesson_number,
                                    question, examples)
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


@app.route('/grade', methods=['POST'])
def handle_grading():
    try:
        data = request.get_json()
        code = data.get('code')
        language = data.get('selectedLanguage')
        inputs = data.get('inputs')
        outputs = data.get('outputs')
        if code:
            status = True
            c = 0
            for stdin in inputs:
                response = compile_and_run(code, language, stdin)
                if response['stderr'] != '':
                    status = False
                    break
                else:
                    if response['stdout'].strip() != outputs[c]:
                        status = False
                        break
                    c = c + 1

            if status:
                response_data = {
                    'status': 'Accepted',
                }
            else:
                if response['stderr'] != '':
                    error_hint = getErrorExplanation(response['stderr'])
                    response_data = {
                        'status': 'Compilation Error',
                        'error': error_hint
                    }
                else:
                    response_data = {
                        'status': 'Rejected',
                    }
        else:
            response_data = {
                'status': 'Empty Error'
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
        response = jsonify({'message': 'Email already exists.'})
        response.status_code = 409
        return response

    existing_user = Student.query.filter_by(username=data['username']).first()

    if existing_user:
        response = jsonify({'message': 'Username already exists.'})
        response.status_code = 409
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

    response = jsonify({'message': 'New user created.'})
    response.status_code = 201
    return response


# Creae API endpoint for login
@app.route('/login', methods=['POST'])
def login():
    # Get the request body data
    data = request.get_json()

    # Check if the user exists
    existing_user = Student.query.filter_by(email=data['email']).first()

    if not existing_user:
        response = jsonify({'message': 'User does not exist.'})
        response.status_code = 404
        return response

    # Check if the password matches
    if existing_user.password != data['password']:
        response = jsonify({'message': 'Wrong password.'})
        response.status_code = 401
        return response

    # return username and email
    response = jsonify({'username': existing_user.username,
                       'email': existing_user.email})

    # response=jsonify({'message': 'User logged in.'})
    response.status_code = 200
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


@app.route('/courses/search', methods=['GET'])
def search_courses():
    print('searching')
    search_query = request.args.get('search')

    if search_query:
        search_results = Course.query.filter(or_(
            Course.course_name.ilike(f'%{search_query}%'),
            Course.short_description.ilike(f'%{search_query}%')
        )).all()

        search_results_list = []
        for result in search_results:
            result_data = {
                'course_id': result.course_id,
                'course_name': result.course_name,
                'short_description': result.short_description
            }
            search_results_list.append(result_data)

        return jsonify({'searchResults': search_results_list})

    return jsonify({'message': 'No search query provided'})


@app.route('/courses/check-course/<string:course_name>', methods=['GET'])
def check_course(course_name):
    course_name = course_name.strip()

    # Check if a course with the given course_name exists (case-insensitive)
    existing_course = Course.query.filter(func.lower(
        Course.course_name) == course_name.lower()).first()

    if existing_course:
        response = jsonify(
            {'message': 'Course with the same name exists.', 'courseExists': 'true'})
        response.status_code = 200
        return response
    else:
        response = jsonify(
            {'message': 'Course with the same name does not exist.', 'courseExists': 'false'})
        response.status_code = 404
        return response

# Create the API endpoint for retrieving course details


@app.route('/courses/<int:course_id>', methods=['GET'])
def get_course_details(course_id):
    # Query the database for the course
    queried_course = Course.query.filter_by(course_id=course_id).first()

    if not queried_course:
        response = jsonify({'error': 'Course not found.'})
        response.status_code = 404
        return response

    # Convert the course object to a dictionary
    course_details = {
        'course_id': queried_course.course_id,
        'course_name': queried_course.course_name,
        'short_description': queried_course.short_description,
        'long_description': queried_course.long_description,
        'total_week': queried_course.total_week,
    }

    response = jsonify({'course': course_details})
    response.status_code = 200
    return response


@app.route('/courses/mcqs/<int:course_id>/<int:week_no>/<int:lesson_id>', methods=['GET'])
def get_mcqs(course_id, week_no, lesson_id):
    # Query the database for MCQ questions
    queried_mcqs = mcqs.query.filter_by(
        course_id=course_id, week_no=week_no, lesson_id=lesson_id).all()

    if not queried_mcqs:
        response = jsonify({'error': 'No MCQ questions found.'})
        response.status_code = 404
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

    response = jsonify({'mcqs': mcq_list})
    response.status_code = 200
    return response


@app.route('/courses/reading_materials/<int:course_id>/<int:week_no>', methods=['GET'])
def get_reading_materials_prev(course_id, week_no):
    materials = reading_materials.query.filter_by(
        course_id=course_id, week_no=week_no).order_by(reading_materials.section_id).all()

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
    materials = reading_materials.query.filter_by(
        course_id=course_id, week_no=week_no, lesson_id=lesson_no).order_by(reading_materials.section_id).all()

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
    materials = reading_materials.query.filter_by(
        course_id=course_id, week_no=week_no, lesson_id=lesson_id).all()

    if not materials:
        response = jsonify({'error': 'No reading materials found.'})
        response.status_code = 404
        return response

    response_materials = []
    for material in materials:
        response_materials.append({
            'section_title': material.section_title,
            'section_content': material.section_content
        })

    response = jsonify({'reading_materials': response_materials})
    response.status_code = 200
    return response

# Create the API endpoint for retrieving problems based on criteria


@app.route('/courses/problems/<int:course_id>/<int:week_no>/<int:lesson_id>', methods=['GET'])
def get_problems(course_id, week_no, lesson_id):

    # Retrieve problems based on the provided criteria
    selected_problems = problems.query.filter_by(course_id=course_id, week_no=week_no,
                                                 lesson_id=lesson_id).all()

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


@app.route('/courses/<int:course_id>/discussion', methods=['GET'])
def get_course_discussion(course_id):
    discussions = Discussion_question.query.filter_by(
        course_id=course_id).all()
    discussion_list = []
    for discussion in discussions:
        discussion_replies = Discussion.query.filter_by(
            question_id=discussion.question_id).all()
        reply_list = []
        for reply in discussion_replies:
            reply_list.append({
                'question_reply_id': reply.question_reply_id,
                'reply': reply.reply,
                'reply_user_name': reply.reply_user_name
            })
        discussion_list.append({
            'course_id': discussion.course_id,
            'question_id': discussion.question_id,
            'question': discussion.question,
            'user_name': discussion.user_name,
            'replies': reply_list
        })

    response = jsonify({'discussions': discussion_list})
    response.status_code = 200
    return response


@app.route('/api/save_mcqs', methods=['POST'])
def save_mcqs():
    try:
        data = request.json  # Get the JSON data from the request
        course_id = data['course_id']
        week_no = data['week_no']
        lesson_id = data['lesson_id']
        mcqs_data = data['mcqs']
        
        # Delete existing MCQs for the given course, week, and lesson
        mcqs_to_delete = mcqs.query.filter_by(
            course_id=course_id,
            week_no=week_no,
            lesson_id=lesson_id
        ).delete()
        
        # Commit the deletion to the database
        db.session.commit()
        
        # Add the new MCQs from the frontend
        for mcq in mcqs_data:
            question = mcq['question']
            option_1 = mcq['choices'][0]
            option_2 = mcq['choices'][1]
            option_3 = mcq['choices'][2]
            option_4 = mcq['choices'][3]
            correct = mcq['correctAnswer']
            
            # Create a new MCQ object and add it to the database
            new_mcq = mcqs(
                course_id=course_id,
                week_no=week_no,
                lesson_id=lesson_id,
                question=question,
                option_1=option_1,
                option_2=option_2,
                option_3=option_3,
                option_4=option_4,
                correct=correct
            )
            db.session.add(new_mcq)
        
        # Commit the changes to the database
        db.session.commit()
        
        return jsonify({"message": "MCQs have been saved successfully"}), 200
    
    except Exception as e:
        db.session.rollback()  # Rollback changes in case of an error
        return jsonify({"message": "Error saving MCQs"}), 500

    
@app.route('/api/load_mcqs', methods=['GET'])
def load_mcqs():
    try:
        course_id = request.args.get('course_id')
        week_no = request.args.get('week_no')
        lesson_id = request.args.get('lesson_id')

        mcqs_data = mcqs.query.filter_by(
            course_id=course_id,
            week_no=week_no,
            lesson_id=lesson_id
        ).all()

        mcqs_list = [{
            'question': mcq.question,
            'choices': [mcq.option_1, mcq.option_2, mcq.option_3, mcq.option_4],
            'correctAnswer': mcq.correct
        } for mcq in mcqs_data]

        return jsonify({"mcqs": mcqs_list}), 200

    except Exception as e:
        return jsonify({"message": "Error fetching MCQs data"}), 500


@app.route('/api/save_problems', methods=['POST'])
def save_problems():
    try:
        data = request.json  # Get the JSON data from the request
        course_id = data['course_id']
        week_no = data['week_no']
        lesson_id = data['lesson_id']
        problems_data = data['problems']

        # Delete existing problems with the provided course_id, week_no, and lesson_id
        problems.query.filter_by(
            course_id=course_id,
            week_no=week_no,
            lesson_id=lesson_id
        ).delete()

        # Add new problems from the frontend data
        for problem in problems_data:
            question = problem['problemDescription']
            examples = "\n\n".join([f"Input:\n{tc['input']}\n\nOutput:\n{tc['output']}\n\nExplanation:\n{tc['explanation']}" for tc in problem['testCases']])

            # Create a new problems object and add it to the database
            new_problem = problems(
                course_id=course_id,
                week_no=week_no,
                lesson_id=lesson_id,
                question=question,
                examples=examples
            )
            db.session.add(new_problem)

        db.session.commit()  # Commit the changes to the database
        return jsonify({"message": "Problems have been saved successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Rollback changes if there's an error
        return jsonify({"message": "Error saving problems"}), 500


@app.route('/api/load_problems', methods=['GET'])
def load_problems():
    try:
        course_id = request.args.get('course_id')
        week_no = request.args.get('week_no')
        lesson_id = request.args.get('lesson_id')
        
        # Fetch problems from the database based on the provided parameters
        selected_problems = problems.query.filter_by(
            course_id=course_id,
            week_no=week_no,
            lesson_id=lesson_id
        ).order_by(problems.problem_id).all()
      
        # Convert problems to a format suitable for JSON response
        problems_list = []
        for problem in selected_problems:
            examples_text = problem.examples
            examples = examples_text.split('\n\n')

            test_cases = []
            for i in range(0, len(examples), 3):
                input_text = examples[i].strip('Input:\n')
                output_text = examples[i + 1].strip('Output:\n')
                explanation_text = examples[i + 2].strip('Explanation:\n')
                test_cases.append({
                    'input': input_text,
                    'output': output_text,
                    'explanation': explanation_text
                })

            problems_list.append({
                'problemDescription': problem.question,
                'testCases': test_cases
            })

        return jsonify({"problems": problems_list}), 200

    except Exception as e:
        return jsonify({"message": "Error fetching problems"}), 500



@app.route('/api/save_section_contents', methods=['POST'])
def save_section_contents():
    try:
        data = request.json
        
        # Extract course_id, week_no, and lesson_id from the request data
        course_id = data['course_id']
        week_no = data['week_no']
        lesson_id = data['lesson_id']
        
        # Delete existing rows with the same course_id, week_no, and lesson_id
        reading_materials.query.filter_by(
            course_id=course_id,
            week_no=week_no,
            lesson_id=lesson_id
        ).delete()
        
        # Commit the deletion
        db.session.commit()
        
        # Add the new sections
        for section in data['sections']:
            new_section = reading_materials(
                course_id=course_id,
                week_no=week_no,
                lesson_id=lesson_id,
                section_title=section['title'],
                section_content=section['details'],
                section_id=section['section_id']
            )
            db.session.add(new_section)

        # Commit the addition
        db.session.commit()
        
        return jsonify({"message": "Section contents saved successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error saving section contents"}), 500



@app.route('/api/load_section_contents', methods=['GET'])
def load_section_contents():
    try:
        # Extract course_id, week_no, and lesson_id from the query parameters
        course_id = request.args.get('course_id')
        week_no = request.args.get('week_no')
        lesson_id = request.args.get('lesson_id')

        # Query the database to get existing sections
        existing_sections = reading_materials.query.filter_by(
            course_id=course_id,
            week_no=week_no,
            lesson_id=lesson_id
        ).order_by(reading_materials.section_id).all()

        # Convert the sections to a list of dictionaries
        sections = [{
            'section_id': section.section_id,
            'title': section.section_title,
            'details': section.section_content
        } for section in existing_sections]

        return jsonify({'sections': sections}), 200
    except Exception as e:
        return jsonify({"message": "Error loading section contents"}), 500


@app.route('/hint', methods=['POST', 'GET'])
def handle_hint():
    global hint_count, hint, question, code

    if request.method == 'POST':
        data = request.get_json()
        hint_count = data.get('hintCount', 0)
        question = data.get('question')
        code = data.get('code')
        return jsonify({'message': 'Hint count updated successfully.'})

    elif request.method == 'GET':
        hint = getHints(hint_count, question, code)
        return jsonify({'hint': hint})


# Running app
if __name__ == '__main__':
    app.run(debug=True)


#DELETE FROM reading_materials
#WHERE section_content='sec 1 details modified' OR section_content='sec 2 details modified' OR section_content='sec 3 details newly added';
