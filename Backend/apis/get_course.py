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

#this class is for adding new comment into database
class Get_course(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    
    def get(self):
        # Hardcoded course information
        course_name = "Hello"
        short_description = "Helloooooo"
        
        course_data = {
            'course_name': course_name,
            'short_description': short_description
        }
        response = jsonify({'course': course_data})
        response.status_code = 200 # or 400 or whatever
        return response
        #return jsonify({'course': course_data}), 200
        
