import React, { useState,useEffect } from 'react';
import { useParams, Link ,useNavigate } from "react-router-dom";
import { useUserContext } from '../UserContext'; 
import { useAuth } from '../useAuth'; 
import './AddCourseMaterialsPage.css';
import './AddCourse.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Navbar';
import Footer from './Footer';

function AddCourseMaterialsPage() {
  const { teacher_id, course_id, week_no} = useParams();
  // Define an array of week names
  const [weekNames, setWeekNames] = useState(generateWeekNames(week_no));

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



  function generateWeekNames(n) {
    const weekNames = [];
    for (let i = 1; i <= n; i++) {
      weekNames.push(`Week ${i}`);
    }
    return weekNames;
  }


  // Function to add a new week
  const handleAddWeek = () => {
    const newWeekNames = [...weekNames];
    const newWeekNumber = weekNames.length + 1;
    newWeekNames.push(`Week ${newWeekNumber}`);
    setWeekNames(newWeekNames);
  };

  return (
    <div className="add-course-materials-page">
      <div className="sidebar">
        <div className="sidebar-content">
          {/* Map over the weekNames array to generate buttons */}
          {weekNames.map((weekName, index) => (
            <Link to={`/teacher/${teacher_id}/addCourse/${course_id}/week/${index+1}`}>
              <button className="week-button">
                {weekName}
              </button>
            </Link>
          ))}
        </div>
        <div className="sidebar-header">
          <button className="add-new-week-button" onClick={handleAddWeek}>
            Add New Week
          </button>
        </div>
      </div>
      <div className="content">
        <h1>Add Course Materials For Week {week_no}</h1>
        <div className="action-buttons">
          <Link to={`/teacher/${teacher_id}/addCourse/${course_id}/week/${week_no}/lesson/1/1`}>
            <button className="action-button">Add Reading Materials</button>
          </Link>
          <Link to={`/teacher/${teacher_id}/addCourse/${course_id}/week/${week_no}/lesson/1/2`}>
            <button className="action-button">Add MCQs</button>
          </Link>
          <Link to={`/teacher/${teacher_id}/addCourse/${course_id}/week/${week_no}/lesson/1/3`}>
            <button className="action-button">Add Problems</button>
          </Link>
        </div>

        <div className="complete-button-container">
        <Link to={`/teacher/${teacher_id}/courses`}>
          <button className="complete-button">Finish Uploading</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default AddCourseMaterialsPage;
