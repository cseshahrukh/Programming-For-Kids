from flask import Flask, request, jsonify
from logging import FileHandler,WARNING

import datetime

x = datetime.datetime.now()

app = Flask(__name__, template_folder = 'template')

# Route for seeing a data
# @app.route('/data')
# def get_time():
    
#     data = {
#         'project_name': "Programming For Kidz",
#         'members': "Md. Shahrukh Islam\nMd. Sohidul Islam\nMd. Ahanaf Tahmid",
#         'first_code_date': datetime.datetime.now(),
#         'front_end': "React",
#         'back_end': "Flask"
#     }
#     return jsonify(data)

@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.json  # Get the JSON data sent from the frontend
    # Process and store the data as needed
    print(data)
    return jsonify(message="Data received successfully")

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)