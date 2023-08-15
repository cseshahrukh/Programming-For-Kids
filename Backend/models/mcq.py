from Backend import db

class MCQ(db.Model):
    __tablename__ = 'MCQ'
    
    mcq_id = db.Column(db.Integer, primary_key=True, nullable=False)
    question = db.Column(db.String(1000), nullable=False)
    correct_option = db.Column(db.String(1), nullable=False)  # Use a string to store the correct option label
    explanation = db.Column(db.String(1000))
    
    # Course association
    course_id = db.Column(db.Integer, db.ForeignKey('Course.course_id'), nullable=False)
    course = db.relationship('Course', back_populates='mcqs')
    
    options = db.relationship('MCQOption', back_populates='mcq', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f"MCQ(mcq_id={self.mcq_id}, question={self.question})"
    
    def to_dict(self):
        return {
            'mcq_id': self.mcq_id,
            'question': self.question,
            'correct_option': self.correct_option,
            'explanation': self.explanation,
            'course_id': self.course_id,
            'options': [option.to_dict() for option in self.options]
        }

class MCQOption(db.Model):
    __tablename__ = 'MCQOption'
    
    option_id = db.Column(db.Integer, primary_key=True, nullable=False)
    option_label = db.Column(db.String(1), nullable=False)  # Use a string to store the option label (A, B, C, etc.)
    option_text = db.Column(db.String(500), nullable=False)
    mcq_id = db.Column(db.Integer, db.ForeignKey('MCQ.mcq_id'), nullable=False)
    
    mcq = db.relationship('MCQ', back_populates='options')
    
    def to_dict(self):
        return {
            'option_id': self.option_id,
            'option_label': self.option_label,
            'option_text': self.option_text,
            'mcq_id': self.mcq_id
        }
