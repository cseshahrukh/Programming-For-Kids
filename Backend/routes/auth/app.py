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


class RegisterForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        if existing_user_username:
            raise ValidationError(
                'That username already exists. Please choose a different one.')


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
    form = RegisterForm()

    if form.validate_on_submit():
        #hashed_password = form.password.data
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode("utf-8", "ignore")
        #hashed_password = bcrypt.generate_password_hash(form.password.data)
        #hashed_password = hashed_password.decode("utf-8", "ignore")
        
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template('register.html', form=form)


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
                return redirect(url_for('dashboard'))
    return render_template('login.html', form=form)


@app.route('/dashboard/', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template('dashboard.html')


@app.route('/logout/', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))





if __name__ == '__main__':
    app.run(port=5000, debug=True)