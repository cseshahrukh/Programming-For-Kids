import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavbarStudent from './NavbarStudent';
import Footer from './Footer';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

const CourseCompletion = () => {
  const { username, course_id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext(); // Get user data from context
  const isAuthenticated = useAuth(); // Use the custom hook

  const handleCompletedCourse = () => {
    const data = {
      username: username, 
      course_id: course_id,
    };

    fetch('/api/save-completed-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('Course completion saved successfully.');
        } else {
          console.error('Failed to save course completion.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavbarStudent username={username} />
      </header>
      <div className="container">
        <button onClick={handleCompletedCourse}>Click To Mark As Completed</button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CourseCompletion;
