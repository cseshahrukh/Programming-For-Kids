from Backend import db
class Student(db.Model):
    # Define the columns for the Student table
    student_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    school_name = db.Column(db.String(50))
    level = db.Column(db.String(50), nullable=False)
    current_course = db.Column(db.Integer)
    total_points = db.Column(db.Integer, nullable=False)
    currentweekly_module = db.Column(db.Integer)

    # Define foreign key constraint
    #__table_args__ = (
        #db.ForeignKeyConstraint([currentweekly_module], ['WeeklyModules.weeklymodule_id']),
    #)

    def __repr__(self):
        return f"Student(student_id={self.student_id}, name={self.name})"
