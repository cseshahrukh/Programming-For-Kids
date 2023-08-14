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
from Backend.models.teacher import *

#this class is for adding new comment into database
class Create_course(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def post(self):

        # current_teacher_id = get_jwt_identity()
        current_teacher_id = 1

        title = request.json.get('title')
        description = request.json.get('description')
        course_level = request.json.get('course_level')

        if not title or not description:
            return jsonify({'error': 'Title and description are required'}), 400

        new_course = Course(
            course_name=title,
            short_description=description,
            teacher_id=current_teacher_id, 
            course_level=course_level
        )

        db.session.add(new_course)
        db.session.commit()

        response = jsonify({'message': 'Course created successfully'})
        response.status_code = 200 # or 400 or whatever
        return response
        

        
