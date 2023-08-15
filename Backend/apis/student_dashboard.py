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


class GetNewuserRecommCourses(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def get(self):
        beginner_courses = Course.query.filter_by(course_level='Beginner').all()

        print("Printing beginner course s ")
        print(beginner_courses)
        #recommended_courses=beginner_courses
        recommended_courses = []

        for course in beginner_courses:
            #if not CoursePrerequisite.query.filter_by(course_id=course.course_id).first():
                recommended_courses.append({
                    'course_id': course.course_id,
                    'course_name': course.course_name,
                    'course_level': course.course_level,
                    'short_description': course.short_description
                })
        

        if not recommended_courses:
            response=jsonify({'error': 'No recommended courses found for new users.'})
            response.status_code=400

        response=jsonify({'recommended_courses': recommended_courses})
        response.status_code=200

        return response
     

class GetCurrentCourse(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def get(self):
        student_id = 1  # We have to replace this with the student_id of the current user (we can get it from the authentication)

        student = Student.query.get(student_id)
        if not student:
            response=jsonify({'error': 'Student not found.'})
            response.status_code=404
            return response

        current_course_id = student.current_course

        if not current_course_id:
            response=jsonify({'error': 'No incomplete courses found for the user.'})
            response.status_code=404
            return response

        current_course = Course.query.get(current_course_id)

        if not current_course:
            response=jsonify({'error': 'Current course not found.'})
            response.status_code=404
            return response

        incomplete_courses = [
            {
                'course_id': current_course.course_id,
                'course_name': current_course.course_name,
                'course_level': current_course.course_level,
                'short_description': current_course.short_description
            }
        ]
        print("Printing current incomplete course:")
        print(incomplete_courses)

        response=jsonify({'incomplete_courses': incomplete_courses})
        response.status_code=200
        return response
    

class GetCourseSearch(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def get(self,keyword):
        #keyword = request.args.get('keyword', '').strip()
        if not keyword:
            response=jsonify({'error': 'Keyword not provided.'})
            response.status_code=400
            return response


        courses = Course.query.filter(Course.course_name.ilike(f'%{keyword}%')).all()

        if not courses:
            response=jsonify({'error': 'No courses found.'})
            response.status_code=404
            return response
    

        response_courses = []
        for course in courses:
            response_courses.append({
                'course_id': course.course_id,
                'course_name': course.course_name,
                'course_level': course.course_level,
                'short_description': course.short_description
            })

        print("Printing search result of courses")
        print(response_courses)

        response=jsonify({'courses': response_courses})
        response.status_code=200
        return response
















         













