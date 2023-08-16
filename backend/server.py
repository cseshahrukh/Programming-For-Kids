from flask import request, jsonify, render_template
from models import *
from dbInserters import *

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

@app.route('/courses')
def fetch_courses():
    all_courses = course.query.all()


# Running app
if __name__ == '__main__':
    app.run(debug=True)
