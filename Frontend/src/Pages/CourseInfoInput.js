import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import './CourseInfoInput.css';
import './AddCourse.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Navbar';
import Footer from './Footer';


function CourseInfoInput() {
    const [courseInfo, setCourseInfo] = useState({
      title: '',
      shortDescription: '',
      detailDescription: '',
      courseLevel: 'Beginner',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCourseInfo({ ...courseInfo, [name]: value });
    };
  
    return (
      <div className="course-info-container">
        <h1>Please fill up the course information</h1>
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
        <Link to="/addCourse/101/week/1"> {/* Replace '/next-page' with the actual route for the next page */}
          <button className="next-button">Next</button>
        </Link>
      </div>
    );
  }
  
  export default CourseInfoInput;
