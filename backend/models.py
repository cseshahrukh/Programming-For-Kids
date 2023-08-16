from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from sqlalchemy.sql import func

app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ahanaf:Uxo1lvcCTKivUMe1yIV6ES5a972rwuUd@dpg-cjd8h2bbq8nc738bcm7g-a.singapore-postgres.render.com/project_db_6iim'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def initialize():
    return app, db

class reading_materials(db.Model):
    course_id = db.Column(db.Integer, primary_key=True)
    week_no = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, primary_key=True)
    section_title = db.Column(db.String, primary_key=True, nullable=False)
    section_content = db.Column(db.String, nullable=False)

class problems(db.Model):
    course_id = db.Column(db.Integer)
    week_no = db.Column(db.Integer)
    lesson_id = db.Column(db.Integer)
    question = db.Column(db.String, primary_key=True, nullable=False)
    examples = db.Column(db.String, nullable=False)

class mcqs(db.Model):
    course_id = db.Column(db.Integer, primary_key=True)
    week_no = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, primary_key=True, nullable=False)
    option_1 = db.Column(db.String, nullable=False)
    option_2 = db.Column(db.String, nullable=False)
    option_3 = db.Column(db.String, nullable=False)
    option_4 = db.Column(db.String, nullable=False)
    correct = db.Column(db.Integer, nullable=False)

class weekly_modules(db.Model):
    course_id = db.Column(db.Integer, primary_key=True)
    week_no = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, primary_key=True)
    topics = db.Column(db.String)

class course(db.Model):

    __tablename__ = 'Course'
    # Define the columns for the Course table
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_name = db.Column(db.String(50), nullable=False)
    course_level = db.Column(db.String(50), nullable=False)
    short_description = db.Column(db.String(500))
    proper_description = db.Column(db.String)
    # teacher_id = db.Column(db.Integer, db.ForeignKey('Teacher.teacher_id'), nullable=False)
    # prerequisite_id = db.Column(db.Integer, db.ForeignKey('Course.course_id'))

