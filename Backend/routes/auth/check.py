from flask import Flask
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

pw_hash = bcrypt.generate_password_hash('hunter2')
flag = bcrypt.check_password_hash(pw_hash, 'hunter2') # returns True

print(flag)