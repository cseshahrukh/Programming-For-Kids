from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///programming_learning_platform.db"
app.config['SQLALCHEMY_TRACK_MODIFICATION']=False

db = SQLAlchemy(app)

# Import routes here
#from backendapp.routes import auth, courses, materials, mcq_tests, programming_problems, discussions

# Initialize database
#db.create_all()
