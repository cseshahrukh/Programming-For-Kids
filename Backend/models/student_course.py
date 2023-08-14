from backend import db

class StudentCourse(db.Model):
    # Define the table name (optional, by default it uses the class name in lowercase)
    __tablename__ = 'Student_Course'
    # Define the columns for the Student_Course table
    student_id = db.Column(db.Integer, db.ForeignKey("Student.student_id"), primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("Course.course_id"), primary_key=True, nullable=False)
    #student_id = db.Column(db.Integer, primary_key=True, nullable=False)
    #course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    achieved_score = db.Column(db.Integer, nullable=False)
    is_completed = db.Column(db.Boolean, nullable=False)

    # Define foreign key constraints
    #__table_args__ = (
        #db.ForeignKeyConstraint([student_id], ['Student.student_id']),
        #db.ForeignKeyConstraint([course_id], ['Course.course_id']),
    #)

    def __repr__(self):
        return f"StudentCourse(student_id={self.student_id}, course_id={self.course_id})"