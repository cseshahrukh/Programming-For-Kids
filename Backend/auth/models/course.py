from auth import db

class Course(db.Model):
    __tablename__ = 'Course'
    # Define the columns for the Course table
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    course_level = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500))
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)

    def __repr__(self):
        return f"Course(course_id={self.course_id}, course_name={self.course_name})"