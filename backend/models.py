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
    section_id = db.Column(db.Integer)

    def __repr__(self):
        return f"ReadingMaterial(course_id={self.course_id}, week_no={self.week_no}, lesson_id={self.lesson_id}, section_title={self.section_title})"


class problems(db.Model):
    problem_id = db.Column(db.String , nullable=False)
    course_id = db.Column(db.Integer)
    week_no = db.Column(db.Integer)
    lesson_id = db.Column(db.Integer)
    question = db.Column(db.String, primary_key=True, nullable=False)
    examples = db.Column(db.String, nullable=False)

class mcqs(db.Model):
    __tablename__="mcqs"
    course_id = db.Column(db.Integer, primary_key=True)
    week_no = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, primary_key=True, nullable=False)
    option_1 = db.Column(db.String, nullable=False)
    option_2 = db.Column(db.String, nullable=False)
    option_3 = db.Column(db.String, nullable=False)
    option_4 = db.Column(db.String, nullable=False)
    correct = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"mcqs(course_id={self.course_id}, week_no={self.week_no}, lesson_id={self.lesson_id}, question={self.question})"


class weekly_modules(db.Model):
    course_id = db.Column(db.Integer, primary_key=True)
    week_no = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, primary_key=True)
    topics = db.Column(db.String)

class Course(db.Model):
    __tablename__ = 'Course'
    # Define the columns for the Course table
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_name = db.Column(db.String(50), nullable=False)
    course_level = db.Column(db.String(50), nullable=False)
    short_description = db.Column(db.String(500))
    long_description = db.Column(db.String)
    teacher_id = db.Column(db.Integer, nullable=False)
    prerequisite_id = db.Column(db.Integer)
    #teacher_id = db.Column(db.Integer,db.ForeignKey('Teacher.teacher_id'),nullable=False)
    #prerequisite_id = db.Column(db.Integer, db.ForeignKey('Course.course_id'))
    total_week = db.Column(db.Integer)

    def __repr__(self):
        return f"Course(course_id={self.course_id}, course_name={self.course_name})"

# Define the Student table
class Student(db.Model):

    __tablename__ = 'Student'
    # Define the columns for the Student table
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    level = db.Column(db.String(50), nullable=False)
    
    def __repr__(self):
        return f"Student(student_id={self.id}, student_name={self.name})"
    

# Define the Teacher table
class Teacher(db.Model):
    __tablename__ = 'Teacher'
    # Define the columns for the table
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
 
    def __repr__(self):
        return f"Teacher(teacher_id={self.id}, teacher_name={self.name})"


class Discussion_question(db.Model) :
    __tablename__ = 'Discussion_question'
    question_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('Course.course_id'), nullable=False)
    question = db.Column(db.String(500))
    user_name = db.Column(db.String(50))
    def __repr__(self):
        return f"Discussion(course_id={self.course_id}, question_id={self.question_id}, question={self.question}, user_name={self.user_name})"
class Discussion(db.Model) :
    __tablename__ = 'Discussion'
    question_id = db.Column(db.Integer, primary_key=True, nullable=False)
    question_reply_id = db.Column(db.Integer, primary_key=True, nullable=False)
    reply = db.Column(db.String(500))
    reply_user_name = db.Column(db.String(50))
    def __repr__(self):
        return f"Discussion(course_id={self.course_id}, question_reply_id={self.question_reply_id}, question={self.question}, reply={self.reply}, user_name={self.user_name}, reply_user_name={self.reply_user_name})"
    
class Completed_course(db.Model):
    __tablename__ = 'Completed_course'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    course_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Completed_course(username={self.username}, course_id={self.course_id})"
    
class Progression(db.Model):
    __tablename__ = 'Progression'
    
    username = db.Column(db.String(50), primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    week_no = db.Column(db.Integer, nullable=False)
    lesson_id = db.Column(db.Integer, nullable=False)
    material = db.Column(db.String(50), nullable=True); 
    def __repr__(self):
        return f"Progression(username={self.username}, course_id={self.course_id}, week_no={self.week_no}, lesson_id={self.lesson_id}, material={self.material})"
    
    def as_dict(self):
        return {
            'username': self.username,
            'course_id': self.course_id,
            'week_no': self.week_no,
            'lesson_id': self.lesson_id,
            'material': self.material,
        }