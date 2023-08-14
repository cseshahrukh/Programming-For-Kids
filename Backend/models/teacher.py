from Backend import db

class Teacher(db.Model):
    __tablename__ = 'Teacher'
    
    teacher_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    subject = db.Column(db.String(50), nullable=False)
    
    # Define a one-to-many relationship between Teacher and Course
    #courses = db.relationship('Course', backref='teacher', lazy=True) 
    courses = db.relationship('Course', backref='Teacher', cascade='all, delete')

    def __repr__(self):
        return f"Teacher(teacher_id={self.teacher_id}, name={self.name}, subject={self.subject})"
    
    def json(self):
        return {
            'teacher_id': self.teacher_id,
            'name': self.name,
            'subject': self.subject
        }