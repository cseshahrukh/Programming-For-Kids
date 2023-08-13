from flask import request,jsonify
from sqlalchemy import func
from auth import db
from auth import api
import datetime
from flask_restx import Resource
#from flask_jwt_extended import jwt_required, get_jwt_identity
#from your_auth_module import jwt

from auth.models.student import * 
from auth.models.course import * 

#this class is for adding new comment into database
class Create_course(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def post(self):

        # current_teacher_id = get_jwt_identity()
        current_teacher_id = 1

        title = request.json.get('title')
        description = request.json.get('description')

        if not title or not description:
            return jsonify({'error': 'Title and description are required'}), 400

        new_course = Course(
            title=title,
            description=description,
            teacher_id=current_teacher_id
        )

        db.session.add(new_course)
        db.session.commit()

        return jsonify({'message': 'Course created successfully'}), 201

        
