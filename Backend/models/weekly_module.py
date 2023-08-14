from Backend import db
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
    #__table_args__ = (
        #db.ForeignKeyConstraint([course_id], ['Course.course_id']),
    #)

    def __repr__(self):
        return f"WeeklyModules(weeklymodule_id={self.weeklymodule_id}, module_name={self.module_name})"