from flask import request,jsonify
from sqlalchemy import func
from Backend import db
from Backend import api
import datetime
from flask_restx import Resource
from sqlalchemy import func
from Backend.models.student import * 
from Backend.models.course import * 

#this class is for adding new comment into database
class Home(Resource):
    @api.doc(responses={200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'})

    def post(self):

        print("inside post")

        
