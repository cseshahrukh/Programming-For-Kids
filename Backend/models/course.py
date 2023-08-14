from Backend import db

class Course(db.Model):
    __tablename__ = 'Course'
    # Define the columns for the Course table
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_name = db.Column(db.String(50), nullable=False)
    course_level = db.Column(db.String(50), nullable=False)
    short_description = db.Column(db.String(500))
    teacher_id = db.Column(db.Integer, db.ForeignKey('Teacher.teacher_id'), nullable=False)
    prerequisite_id = db.Column(db.Integer, db.ForeignKey('Course.course_id'))
    def __repr__(self):
        return f"Course(course_id={self.course_id}, course_name={self.course_name})"
    
    def json(self):
        print("inside course json")
        return {'course_id': self.course_id, 'course_name': self.course_name, 'course_level': self.course_level, 'short_description': self.short_description, 'teacher_id': self.teacher_id, 'prerequisite_id': self.prerequisite_id}