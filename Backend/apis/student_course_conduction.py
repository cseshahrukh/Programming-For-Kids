from flask import request,jsonify
from sqlalchemy import func
from Backend import db
from Backend import api
import datetime
from flask_restx import Resource
#from flask_jwt_extended import jwt_required, get_jwt_identity
#from your_auth_module import jwt

from Backend.models.student import * 
from Backend.models.course import * 
from Backend.models.student_course import *
from Backend.models.weekly_module import *


class EnrollintoCourse(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def post(self):
        data = request.json

        if not data:
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
    

class GetCurrentcourseProgress(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def get(self):
        student_id = 1  # Replace this with the actual method to get the student_id
        #student_id=current_user.id
        print("Student ID is ", student_id)
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
    
