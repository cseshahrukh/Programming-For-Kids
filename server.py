# Import flask and datetime module for showing date and time
from flask import Flask, jsonify


import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
@app.route('/data')
def get_time():
    
    data = {
        'project_name': "Programming For Kidz",
        'members': "Md. Shahrukh Islam\nMd. Sohidul Islam\nMd. Ahanaf Tahmid",
        'first_code_date': datetime.datetime.now(),
        'front_end': "React",
        'back_end': "Flask"
    }
    return jsonify(data)

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)