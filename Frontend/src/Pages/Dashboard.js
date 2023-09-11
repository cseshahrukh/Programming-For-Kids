import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import { useUserContext } from '../UserContext';
import { useAuth } from '../useAuth';
import Footer from './Footer';
import NavbarStudent from './NavbarStudent';
import Profile from './Profile';

function Dashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext(); // Get user data from context
  const isAuthenticated = useAuth(); // Use the custom hook
  const [completedCourses, setCompletedCourses] = useState([]);
  const [hasCourseInProgress, setHasCourseInProgress] = useState(false);
  const [course_id, setCourse] = useState([]);
  const [week_no, setWeek] = useState([]);
  const [lesson_no, setLesson] = useState([]);

  // Use useEffect to handle the redirection
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page
      navigate(`/login`);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('Fetching completed courses...');
    fetchCompletedCourses();
    checkCourseInProgress();
  }, []);

  const fetchCompletedCourses = async () => {
    try {
      const response = await fetch(`/api/completed-courses?username=${username}`);

      if (response.ok) {
        const data = await response.json();
        setCompletedCourses(data.completed_courses);
      } else {
        console.error('Failed to fetch completed courses');
      }
    } catch (error) {
      console.error('Error fetching completed courses:', error);
    }
  };

  const checkCourseInProgress = async () => {
    try {
      // Make an API call to check if the user has a course in progress
      console.log('Checking if user has a course in progress...');
      const response = await fetch(`/currentsession?username=${username}`);
      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        setCourse(data.course_id);
        setWeek(data.week_no);
        setLesson(data.lesson_no);
        console.log('User has a course in progress');
        setHasCourseInProgress(true);
      } else {
        console.log('User has no course in progress');
        setHasCourseInProgress(false);
      }
    } catch (error) {
      console.error('Error checking course in progress:', error);
    }
  };

  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4' }}>
      <div>
        <NavbarStudent username={username} />
      </div>
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2 style={{ color: '#333' }}>Your Dashboard</h2>
        <div>
        <Link to={`/student/${username}/courses`}
          className="btn btn-primary" style={{ textDecoration: 'none', color: '#fff', background: '#007BFF', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
            Browse Courses
          </Link>
        </div>
        <div>
          {hasCourseInProgress && (
            
            <Link to={`/student/${username}/courses/${course_id}/week/${week_no}/lesson/${lesson_no}/readingMaterials`} 
              className="btn btn-primary"
              style={{ textDecoration: 'none', color: '#fff', background: '#007BFF', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', marginTop: '3%' }}
            >
              Continue Where You Left Off
            </Link>
          )}
        </div>

      </div>
      <div style={{ padding: '0 20px', flex: 1 }}>
        <h1 style={{ color: '#333' }}>Dashboard</h1>
        <div style={{ background: '#fff', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#333' }}>Profile</h3>
          <Profile /> {/* Include the Profile component */}
        </div>
        <div style={{ background: '#fff', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
          <h3 style={{ color: '#333' }}>Completed Courses</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {completedCourses.map((course) => (
              <li key={course.course_id} style={{ margin: '10px 0' }}>
                <Link to={`/student/${username}/courses/${course.course_id}`} style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>
                  {course.course_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Other dashboard content */}
      </div>
      <div>
        <Footer />
        <div className="bubble blue-bubble"></div>
        <div className="bubble green-bubble"></div>
      </div>
    </div>
  );
}

export default Dashboard;
