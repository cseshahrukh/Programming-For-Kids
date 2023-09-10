import React, { useState,useEffect } from 'react';
import { useParams, Link,useNavigate } from "react-router-dom";
import { useUserContext } from '../UserContext'; 
import { useAuth } from '../useAuth'; 
import './AddCourseLessonsPage.css';
import './AddCourse.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Navbar';
import Footer from './Footer';

function AddCourseLessonsPage() {
  const { teacher_id, course_id, week_no, lesson_no, which_page } = useParams();
  // Define an array of week names
  const [lessonNames, setLessonNames] = useState(generateLessonNames(lesson_no));

  const navigate = useNavigate();
  const { user } = useUserContext(); // Get user data from context
  const isAuthenticated = useAuth(); // Use the custom hook
  // Use useEffect to handle the redirection
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page
      navigate(`/login`);    
    }
  }, [isAuthenticated]);

  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

  function generateLessonNames(n) {
    const lessonNames = [];
    for (let i = 1; i <= n; i++) {
      lessonNames.push(`Lesson ${i}`);
    }
    return lessonNames;
  }

  // Function to add a new lesson
  const handleAddLesson = () => {
    const newLessonNames = [...lessonNames];
    const newLessonNumber = lessonNames.length + 1;
    newLessonNames.push(`Lesson ${newLessonNumber}`);
    setLessonNames(newLessonNames);
  };

  return (
    <div className="add-course-lessons-page">
      <h1 style={{ marginLeft: 500 }}>Select The Lesson Number For Adding</h1>
      <div className="main">
        <div className="main-content">
          {lessonNames.map((lessonName, index) => {
            let linkTo = '';
            if (which_page === '1') {
              linkTo = `/teacher/${teacher_id}/addCourse/${course_id}/week/${week_no}/lesson/${index + 1}/readingMaterials`;
            } else if (which_page === '2') {
              linkTo = `/teacher/${teacher_id}/addCourse/${course_id}/week/${week_no}/lesson/${index + 1}/mcqs`;
            } else if (which_page === '3') {
              linkTo = `/teacher/${teacher_id}/addCourse/${course_id}/week/${week_no}/lesson/${index + 1}/problems`;
            }

            return (
              <Link key={index} to={linkTo}>
                <button className="lesson-button">
                  {lessonName}
                </button>
              </Link>
            );
          })}
        </div>
        <div className="main-header">
          <button className="add-new-lesson-button" onClick={handleAddLesson}>
            Add New Lesson
          </button>
        </div>
      </div>
      <div className="complete-button-container">
        <Link to={`/teacher/${teacher_id}/addCourse/${course_id}/week/${week_no}`}>
          <button className="complete-button">Complete</button>
        </Link>
      </div>
    </div>
  );
}

export default AddCourseLessonsPage;
