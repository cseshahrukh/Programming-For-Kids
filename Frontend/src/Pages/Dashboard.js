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
  }, []);

  const fetchCompletedCourses = async () => {
    try {
      const response = await fetch(`/api/completed-courses?username=${username}`);

      if (response.ok) {
        console.log('Response was ok!')
        const data = await response.json();
        setCompletedCourses(data.completed_courses);
      } else {
        console.error('Failed to fetch completed courses');
      }
    } catch (error) {
      console.error('Error fetching completed courses:', error);
    }
  };

  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

  console.log('Completed Courses Before return:', completedCourses);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div>
        <NavbarStudent username={username} />
      </div>
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2>Your Dashboard</h2>
        <div>
          <Link to={`/student/${username}/courses`} className="btn btn-primary">Browse Courses</Link>
        </div>
      </div>
      <div>
        <h1>Dashboard</h1>
        <Profile /> {/* Include the Profile component */}
        <h3>Completed Courses</h3>
        <ul>
          {completedCourses.map((course) => (
            <li key={course.course_id}>
              <Link to={`/student/${username}/courses/${course.course_id}`}>
                {course.course_name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Other dashboard content */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
