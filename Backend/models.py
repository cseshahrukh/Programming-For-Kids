from backendapp import db

class Course(db.Model):
    # Define the columns for the Course table
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_name = db.Column(db.String(50), nullable=False)
    course_level = db.Column(db.String(50), nullable=False)
    short_description = db.Column(db.String(500))

    def __repr__(self):
        return f"Course(course_id={self.course_id}, course_name={self.course_name})"


class CoursePrerequisite(db.Model):
    # Define the table name (optional, by default it uses the class name in lowercase)
    __tablename__ = 'Course_Prerequisite'

    # Define the columns for the Course_Prerequisite table
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    prerequisite_id = db.Column(db.Integer, primary_key=True, nullable=False)

    # Define foreign key constraints
    __table_args__ = (
        db.ForeignKeyConstraint([course_id], ['Course.course_id']),
        db.ForeignKeyConstraint([prerequisite_id], ['Course.course_id']),
    )

    def __repr__(self):
        return f"CoursePrerequisite(course_id={self.course_id}, prerequisite_id={self.prerequisite_id})"


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
    __table_args__ = (
        db.ForeignKeyConstraint([currentweekly_module], ['WeeklyModules.weeklymodule_id']),
    )

    def __repr__(self):
        return f"Student(student_id={self.student_id}, name={self.name})"


class StudentCourse(db.Model):
    # Define the table name (optional, by default it uses the class name in lowercase)
    __tablename__ = 'Student_Course'
    # Define the columns for the Student_Course table
    student_id = db.Column(db.Integer, primary_key=True, nullable=False)
    course_id = db.Column(db.Integer, primary_key=True, nullable=False)
    achieved_score = db.Column(db.Integer, nullable=False)
    is_completed = db.Column(db.Boolean, nullable=False)

    # Define foreign key constraints
    __table_args__ = (
        db.ForeignKeyConstraint([student_id], ['Student.student_id']),
        db.ForeignKeyConstraint([course_id], ['Course.course_id']),
    )

    def __repr__(self):
        return f"StudentCourse(student_id={self.student_id}, course_id={self.course_id})"



class WeeklyModules(db.Model):
    # Define the table name (optional, by default it uses the class name in lowercase)
    __tablename__ = 'WeeklyModules'

    # Define the columns for the WeeklyModules table
    weeklymodule_id = db.Column(db.Integer, primary_key=True, nullable=False)
    week_no = db.Column(db.Integer, nullable=False)
    module_name = db.Column(db.String(50), nullable=False)
    module_description = db.Column(db.String(500))
    course_id = db.Column(db.Integer, nullable=False)

    # Define foreign key constraint
    __table_args__ = (
        db.ForeignKeyConstraint([course_id], ['Course.course_id']),
    )

    def __repr__(self):
        return f"WeeklyModules(weeklymodule_id={self.weeklymodule_id}, module_name={self.module_name})"









