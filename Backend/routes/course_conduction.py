from backendapp import app, db
from flask import jsonify,request
from backendapp.models import Course, CoursePrerequisite,Student,StudentCourse


@app.route('/api/courses/<int:course_id>/register', methods=['POST'])
def enroll_student(course_id):
    data = request.json

    if not data or 'course_id' not in data:
        return jsonify({'error': 'Invalid course registration request.'}), 400

    student_id = 1  # Replace this with the student_id of the current user (you can get it from the authentication)
    course_id = data['course_id']

    # Check if the course exists and the student is not already registered for this course
    course = Course.query.get(course_id)
    if not course:
        return jsonify({'error': 'Course not found.'}), 404

    if course.course_id == Student.query.get(student_id).current_course:
        return jsonify({'error': 'Already registered for this course.'}), 400

    # Update the current_course field in the Student table
    student = Student.query.get(student_id)
    student.current_course = course_id
    db.session.commit()

    # Insert a new row in the StudentCourse table
    student_course = StudentCourse(student_id=student_id, course_id=course_id, achieved_score=0, is_completed=False)
    db.session.add(student_course)
    db.session.commit()

    return jsonify({'message': 'Successfully registered for the course.'}), 200



@app.route('/api/courses/progress', methods=['GET'])
def get_course_progress():
    # Get the student_id of the current user (you can get it from the authentication)
    student_id = 1  # Replace this with the actual method to get the student_id

    # Check if the student exists
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found.'}), 404

    # Get the current course and current weekly module for the student
    current_course_id = student.current_course
    current_weekly_module_id = student.currentweekly_module

    if not current_course_id or not current_weekly_module_id:
        return jsonify({'error': 'Course progress not found.'}), 404

    return jsonify({
        'course_id': current_course_id,
        'currentweekly_module': current_weekly_module_id
    }), 200


@app.route('/api/courses/progress', methods=['POST'])
def complete_weekly_module():
    # Get the student_id of the current user (you can get it from the authentication)
    student_id = 1  # Replace this with the actual method to get the student_id

    # Check if the student exists
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found.'}), 404

    # Check if the current weekly module is valid and can be incremented
    current_module_id = student.currentweekly_module
    if current_module_id is None:
        return jsonify({'error': 'Invalid module completion operation.'}), 400

    # Increment the current weekly module by one
    student.currentweekly_module += 1
    db.session.commit()

    return jsonify({'message': 'Successfully completed the module.'}), 200


@app.route('/api/courses/update_course_completion', methods=['POST'])
def update_course_completion():

    student_id = 1  # Replace this with the actual method to get the student_id

    # Check if the student exists
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found.'}), 404

    course_id = student.current_course

    if not course_id:
        return jsonify({'error': 'Student has no current course to complete.'}), 400

    # Update the current_course and currentweekly_module fields in the Student table
    student.current_course = None
    student.currentweekly_module = None
    db.session.commit()

    # Update the is_completed field in the StudentCourse table
    student_course = StudentCourse.query.filter_by(student_id=student_id, course_id=course_id).first()
    if not student_course:
        return jsonify({'error': 'Student course not found.'}), 404

    student_course.is_completed = True
    db.session.commit()

    return jsonify({'message': 'Successfully completed the course.'}), 200

















