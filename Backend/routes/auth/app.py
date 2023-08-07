from flask import Flask,request,jsonify
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import func
import datetime
from flask import Flask, render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt



import os
import psycopg2
from dotenv import load_dotenv
#from Backend.routes.student_dashboard import printBondhu
#from Backend.student_dashboard import printBondhu
app = Flask(__name__)




api = Api(app)

# Load environment variables
load_dotenv()
db_url = os.getenv('DATABASE_URL')

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# For authentication
app.config['SECRET_KEY'] = 'thisisasecretkey'


# Connect to database
conn = psycopg2.connect(db_url, sslmode='prefer')


bcrypt = Bcrypt(app)
# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Import models
#import models.tables, models.student, models.project, models.field, models.publication,models.post,models.comment,models.community

migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

class Course(db.Model):
    __tablename__ = 'Course'
    # Define the columns for the Course table
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_name = db.Column(db.String(50), nullable=False)
    course_level = db.Column(db.String(50), nullable=False)
    short_description = db.Column(db.String(500))

    def __repr__(self):
        return f"Course(course_id={self.course_id}, course_name={self.course_name})"
    
    
class CoursePrerequisite(db.Model):
    # Define the table name (optional, by default it uses the class name in lowercase)
    __tablename__ = 'Course_Prerequisite'

    # Define the columns for the Course_Prerequisite table
    course_id= db.Column(db.Integer, primary_key=True, nullable=False)
    prerequisite_id = db.Column(db.Integer, primary_key=True, nullable=False)

     #Define foreign key constraints
    #__table_args__ = (
        #db.ForeignKeyConstraint(['CoursePrerequisite.course_id'], ['Course.course_id']),
        #db.ForeignKeyConstraint([prerequisite_id], ['Course.course_id']),
    #)

    def __repr__(self):
        return f"CoursePrerequisite(course_id={self.course_id}, prerequisite_id={self.prerequisite_id})"


class Student(db.Model):
    # Define the columns for the Student table
    student_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    school_name = db.Column(db.String(50))
    level = db.Column(db.String(50), nullable=False)
    current_course = db.Column(db.Integer)
    total_points = db.Column(db.Integer, nullable=False)
    currentweekly_module = db.Column(db.Integer)

    # Define foreign key constraint
    #__table_args__ = (
        #db.ForeignKeyConstraint([currentweekly_module], ['WeeklyModules.weeklymodule_id']),
    #)

    def __repr__(self):
        return f"Student(student_id={self.student_id}, name={self.name})"


class StudentCourse(db.Model):
    # Define the table name (optional, by default it uses the class name in lowercase)
    __tablename__ = 'Student_Course'
    # Define the columns for the Student_Course table
    student_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    achieved_score = db.Column(db.Integer, nullable=False)
    is_completed = db.Column(db.Boolean, nullable=False)

    # Define foreign key constraints
    #__table_args__ = (
        #db.ForeignKeyConstraint([student_id], ['Student.student_id']),
        #db.ForeignKeyConstraint([course_id], ['Course.course_id']),
    #)

    def __repr__(self):
        return f"StudentCourse(student_id={self.student_id}, course_id={self.course_id})"



class WeeklyModules(db.Model):
    # Define the table name (optional, by default it uses the class name in lowercase)
    __tablename__ = 'WeeklyModules'

    # Define the columns for the WeeklyModules table
    weeklymodule_id = db.Column(db.Integer, primary_key=True, nullable=False)
    week_no = db.Column(db.Integer, nullable=False)
    module_name = db.Column(db.String(50), nullable=False)
    module_description = db.Column(db.String(500))
    course_id = db.Column(db.Integer, nullable=False)

    # Define foreign key constraint
    #__table_args__ = (
        #db.ForeignKeyConstraint([course_id], ['Course.course_id']),
    #)

    def __repr__(self):
        return f"WeeklyModules(weeklymodule_id={self.weeklymodule_id}, module_name={self.module_name})"





class RegisterForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Password"})

    name = StringField(validators=[
                           InputRequired(), Length(min=2, max=40)], render_kw={"placeholder": "Name"})
    
    school_name = StringField(validators=[
                           InputRequired(), Length(min=2, max=40)], render_kw={"placeholder": "School Name"})

    class_Study = StringField(validators=[
                           InputRequired(), Length(min=2, max=40)], render_kw={"placeholder": "Class"})
    
    submit = SubmitField('Register')

    def validate_username(self, username):
        print('Inside validate_username function in RegisterForm class')
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        if existing_user_username:
            print('Username is exists')
            raise ValidationError(
                'That username already exists. Please choose a different one.')
        else :
            print('Username can use')


class LoginForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Login')



@app.route('/')
def home():
    print('Inside home function')
    return render_template('home.html')

@ app.route('/register/', methods=['GET', 'POST'])
def register():
    print('Inside register function starts' )
    form = RegisterForm()

    print('Inside register function after form')
    if form.validate_on_submit():
        print('Inside register function after validation')
        #hashed_password = form.password.data
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode("utf-8", "ignore")
        #hashed_password = bcrypt.generate_password_hash(form.password.data)
        #hashed_password = hashed_password.decode("utf-8", "ignore")
        
        new_user = User(username=form.username.data, password=hashed_password)

        new_student = Student(name=form.name.data, school_name=form.school_name.data, level=form.class_Study.data, total_points=0)
        
        print('Inside register function before adding to database')
        db.session.add(new_user)
        db.session.add(new_student)

        db.session.commit()
        print("Inside register function before going to login ")
        return redirect(url_for('login'))

    print('Inside register function before going to register.html')
    return render_template('register.html', form=form)


# @app.route('/login/', methods=['GET', 'POST'])
# def login():
#     print('Inside login function')
#     form = LoginForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(username=form.username.data).first()
#         if user:
#             print('user password is '+user.password)
#             print('form entered password is '+bcrypt.generate_password_hash(form.password.data).decode("utf-8", "ignore"))
#             print('database password is '+user.password)
#             if bcrypt.check_password_hash(user.password, form.password.data):
#             #if user.password == form.password.data:
#                 login_user(user)
#                 return redirect(url_for('dashboard'))
#     return render_template('login.html', form=form)

@app.route('/login/', methods=['GET', 'POST'])
def login():
    print('Inside login function')
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            print('user password is '+user.password)
            print('form entered password is '+bcrypt.generate_password_hash(form.password.data).decode("utf-8", "ignore"))
            print('database password is '+user.password)
            if bcrypt.check_password_hash(user.password, form.password.data):
            #if user.password == form.password.data:
                login_user(user)
                return redirect(url_for('get_recommended_courses'))
    return render_template('login.html', form=form)


@app.route('/dashboard/', methods=['GET', 'POST'])
@login_required
def dashboard():
    #printBondhu()
    return render_template('dashboard.html')


@app.route('/logout/', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/dashboard/newuser', methods=['GET'])
@login_required
def get_recommended_courses():
    
    beginner_courses = Course.query.filter_by(course_level='Beginner').all()

    print("Printing beginner course s ")
    print(beginner_courses)
    recommended_courses = []

    for course in beginner_courses:
        if not CoursePrerequisite.query.filter_by(course_id=course.course_id).first():
            recommended_courses.append({
                'course_id': course.course_id,
                'course_name': course.course_name,
                'course_level': course.course_level,
                'short_description': course.short_description
            })
    
    print("Before Printing recom courses")
    print(recommended_courses)


    #if not recommended_courses:
        #return jsonify({'error': 'No recommended courses found for new users.'}), 404

    #return jsonify({'recommended_courses': recommended_courses}), 200

    flag=True
    if flag:
        return render_template('dashboard_newuser.html')


@app.route('/api/dashboard/incomplete', methods=['GET'])
@login_required
def get_incomplete_courses():
    student_id = 1  # We have to replace this with the student_id of the current user (we can get it from the authentication)

    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found.'}), 404

    current_course_id = student.current_course

    if not current_course_id:
        return jsonify({'error': 'No incomplete courses found for the user.'}), 404

    current_course = Course.query.get(current_course_id)

    if not current_course:
        return jsonify({'error': 'Current course not found.'}), 404

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

    return jsonify({'incomplete_courses': incomplete_courses}), 200



@app.route('/api/dashboard/completed', methods=['GET'])
@login_required
def get_completed_courses():
    student_id = 1  # Replace this with the student_id of the current user (you can get it from the authentication)

    completed_courses = []
    student_courses = StudentCourse.query.filter_by(student_id=student_id, is_completed=True).all()

    if not student_courses:
        return jsonify({'error': 'No completed courses found for the user.'}), 404

    for student_course in student_courses:
        course = Course.query.get(student_course.course_id)
        if not course:
            continue

        completed_courses.append({
            'course_id': course.course_id,
            'course_name': course.course_name,
            'course_level': course.course_level,
            'short_description': course.short_description
        })

    print("Printing completed course:")
    print(completed_courses)
    
    return jsonify({'completed_courses': completed_courses}), 200



@app.route('/api/search-course', methods=['GET'])
@login_required
def search_course():
    keyword = request.args.get('keyword', '').strip()

    if not keyword:
        return jsonify({'error': 'Keyword not provided.'}), 400

    courses = Course.query.filter(Course.course_name.ilike(f'%{keyword}%')).all()

    if not courses:
        return jsonify({'error': 'No courses found.'}), 404

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

    return jsonify({'courses': response_courses}), 200

@app.route('/api/courses/progress', methods=['GET'])
@login_required
def get_course_progress():
    # Get the student_id of the current user (you can get it from the authentication)
    student_id = 1  # Replace this with the actual method to get the student_id
    student_id=current_user.id
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
    student_id=current_user.id
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
    current_user.username

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

if __name__ == '__main__':
    app.run(port=5000, debug=True)