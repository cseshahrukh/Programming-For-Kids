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
from Backend.models.programming_problem import *

@api.route('/create_problem')
class Create_problem(Resource):
    @api.doc(responses={200: 'OK', 400: 'Bad Request', 500: 'Internal Server Error'})
    def post(self):
        data = request.json

        # current_teacher_id = get_jwt_identity()
        current_teacher_id = 1

        problem = data.get('problem')
        sample_input = data.get('sample_input')
        sample_output = data.get('sample_output')
        testing_input = data.get('testing_input')
        testing_output = data.get('testing_output')
        points = data.get('points')
        course_id = data.get('course_id')

        if not problem or not sample_input or not sample_output or not testing_input or not testing_output or not points or not course_id:
            return jsonify({'error': 'All fields are required'}), 400

        new_problem = ProgrammingProblem(
            problem=problem,
            sample_input=sample_input,
            sample_output=sample_output,
            testing_input=testing_input,
            testing_output=testing_output,
            points=points,
            course_id=course_id
        )

        db.session.add(new_problem)
        db.session.commit()

        response = jsonify({'message': 'Problem created successfully'})
        response.status_code = 200
        return response
        
