from models import *

def dbInsertMCQ(week, lesson, question, choices, correct):
    mcq = mcqs(
        course_id=101, 
        week_no=int(week), 
        lesson_id=int(lesson), 
        question=question, 
        option_1=choices[0], 
        option_2=choices[1], 
        option_3=choices[2], 
        option_4=choices[3], 
        correct=int(correct))
    
    db.session.add(mcq)
    db.session.commit()

def dbInsertProblem(week, lesson, question, examples):

    problem = problems(
        course_id=101, 
        week_no=int(week), 
        lesson_id=int(lesson), 
        question=question, 
        examples=examples)
    db.session.add(problem)
    db.session.commit()

def dbInsertReadingMaterials(week, lesson, titles, contents):
    
    for i in range(0, len(titles)):
        material = reading_materials(
            course_id=101, 
            week_no=int(week), 
            lesson_id=int(lesson), 
            section_title=titles[i], 
            section_content=contents[i])
        
        db.session.add(material)
        db.session.commit()

def dbInsertWeeklyModules(week, lesson, topics):

    str = ""
    for topic in topics:
        str = str + (topic) + "\n"

    problem = problems(
        course_id=101, 
        week_no=int(week), 
        lesson_id=int(lesson), 
        topics=str)
    
    db.session.add(problem)
    db.session.commit()

def dbInsertCourse(week, lesson, titles, contents):
    
    for i in range(0, len(titles)):
        material = reading_materials(
            course_id=101, 
            week_no=int(week), 
            lesson_id=int(lesson), 
            section_title=titles[i], 
            section_content=contents[i])
        
        db.session.add(material)
        db.session.commit()

