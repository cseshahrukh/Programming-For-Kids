from Backend import db

class ProgrammingProblem(db.Model):
    __tablename__ = 'ProgrammingProblem'
    
    # Define the columns for the ProgrammingProblem table
    problem_id = db.Column(db.Integer, primary_key=True, nullable=False)
    problem = db.Column(db.String(1000), nullable=False)
    sample_input = db.Column(db.String(500), nullable=False)
    sample_output = db.Column(db.String(500), nullable=False)
    testing_input = db.Column(db.String(1000), nullable=False)
    testing_output = db.Column(db.String(1000), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    
    # Course association
    course_id = db.Column(db.Integer, db.ForeignKey('Course.course_id'), nullable=False)
    course = db.relationship('Course', back_populates='programming_problems')
    
    def __repr__(self):
        return f"ProgrammingProblem(problem_id={self.problem_id}, problem={self.problem})"
    
    def to_dict(self):
        return {
            'problem_id': self.problem_id,
            'problem': self.problem,
            'sample_input': self.sample_input,
            'sample_output': self.sample_output,
            'testing_input': self.testing_input,
            'testing_output': self.testing_output,
            'points': self.points,
            'course_id': self.course_id
        }
