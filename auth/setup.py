from app import app, db

# Ensure that you are inside the application context before using db.create_all()
with app.app_context():
    print('Hello Bondhura')
    db.create_all()
