from flask import Flask,request,jsonify,Blueprint
from flask_migrate import Migrate
from sqlalchemy import func
import datetime
from flask import Flask, render_template, url_for, redirect
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from Backend import app, db
from Backend.models import *

bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


auth_blueprint = Blueprint('auth', __name__)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



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
