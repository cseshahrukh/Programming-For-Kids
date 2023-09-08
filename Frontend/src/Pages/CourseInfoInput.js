import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CourseInfoInput.css';
import './AddCourse.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Navbar';
import Footer from './Footer';

function CourseInfoInput() {
  
  const { teacher_id }=useParams();

  const [courseInfo, setCourseInfo] = useState({
    title: '',
    shortDescription: '',
    detailDescription: '',
    courseLevel: 'Beginner',
    teacher_id:teacher_id,
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  const handleNext = async () => {
    if (!courseInfo.title.trim()) {
      setError('Please fill in the Course Title.');
      return;
    }

    setError('');

    try {
      const response = await fetch('/api/check_course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName: courseInfo.title,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.exists) {
          setError('A course with this title already exists. Please choose a different title.');
        } else {
          const saveResponse = await fetch('/api/save_course', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              courseName: courseInfo.title,
              shortDescription: courseInfo.shortDescription,
              detailDescription: courseInfo.detailDescription,
              courseLevel: courseInfo.courseLevel,
              teacher_id: courseInfo.teacher_id,
            }),
          });

          if (saveResponse.ok) {
            const courseData = await saveResponse.json();
            navigate(`/addCourse/${courseData.course_id}/week/1`);
          } else {
            setError('Error saving course information.');
          }
        }
      } else {
        setError('Error checking course availability.');
      }
    } catch (error) {
      setError('An error occurred.');
    }
  };

  return (
    <div className="course-info-container">
      <h1>Please fill up the course information</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="course-info-form">
        <div>
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseInfo.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="shortDescription">Short Description:</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={courseInfo.shortDescription}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="detailDescription">Detail Description:</label>
          <textarea
            id="detailDescription"
            name="detailDescription"
            value={courseInfo.detailDescription}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="courseLevel">Course Level:</label>
          <select
            id="courseLevel"
            name="courseLevel"
            value={courseInfo.courseLevel}
            onChange={handleInputChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </form>
      <button onClick={handleNext} className="next-button">
        Next
      </button>
    </div>
  );
}

export default CourseInfoInput;
