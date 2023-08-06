# dashboard.py
from backendapp import app
from flask import jsonify,request
from backendapp.models import Course, CoursePrerequisite,Student,StudentCourse

@app.route('/api/dashboard/newuser', methods=['GET'])
def get_recommended_courses():
    beginner_courses = Course.query.filter_by(course_level='Beginner').all()
    recommended_courses = []

    for course in beginner_courses:
        if not CoursePrerequisite.query.filter_by(course_id=course.course_id).first():
            recommended_courses.append({
                'course_id': course.course_id,
                'course_name': course.course_name,
                'course_level': course.course_level,
                'short_description': course.short_description
            })

    if not recommended_courses:
        return jsonify({'error': 'No recommended courses found for new users.'}), 404

    return jsonify({'recommended_courses': recommended_courses}), 200


@app.route('/api/dashboard/incomplete', methods=['GET'])
def get_incomplete_courses():
    student_id = 1  # We have to replace this with the student_id of the current user (we can get it from the authentication)

    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found.'}), 404

    current_course_id = student.current_course

    if not current_course_id:
        return jsonify({'error': 'No incomplete courses found for the user.'}), 404

    current_course = Course.query.get(current_course_id)

    if not current_course:
        return jsonify({'error': 'Current course not found.'}), 404

    incomplete_courses = [
        {
            'course_id': current_course.course_id,
            'course_name': current_course.course_name,
            'course_level': current_course.course_level,
            'short_description': current_course.short_description
        }
    ]

    return jsonify({'incomplete_courses': incomplete_courses}), 200



@app.route('/api/dashboard/completed', methods=['GET'])
def get_completed_courses():
    student_id = 1  # Replace this with the student_id of the current user (you can get it from the authentication)

    completed_courses = []
    student_courses = StudentCourse.query.filter_by(student_id=student_id, is_completed=True).all()

    if not student_courses:
        return jsonify({'error': 'No completed courses found for the user.'}), 404

    for student_course in student_courses:
        course = Course.query.get(student_course.course_id)
        if not course:
            continue

        completed_courses.append({
            'course_id': course.course_id,
            'course_name': course.course_name,
            'course_level': course.course_level,
            'short_description': course.short_description
        })

    return jsonify({'completed_courses': completed_courses}), 200



@app.route('/api/search-course', methods=['GET'])
def search_course():
    keyword = request.args.get('keyword', '').strip()

    if not keyword:
        return jsonify({'error': 'Keyword not provided.'}), 400

    courses = Course.query.filter(Course.course_name.ilike(f'%{keyword}%')).all()

    if not courses:
        return jsonify({'error': 'No courses found.'}), 404

    response_courses = []
    for course in courses:
        response_courses.append({
            'course_id': course.course_id,
            'course_name': course.course_name,
            'course_level': course.course_level,
            'short_description': course.short_description
        })

    return jsonify({'courses': response_courses}), 200







