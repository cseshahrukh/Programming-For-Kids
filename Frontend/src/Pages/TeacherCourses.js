import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const teacher_id = 2; //will be changed according to the session information

  useEffect(() => {
    // Fetch teacher-specific courses from the backend
    fetch(`/teacher_courses?teacher_id=${teacher_id}`)
      .then((response) => response.json())
      .then((data) => setCourses(data.courses))
      .catch((error) => console.error('Error fetching teacher courses:', error));
  }, [teacher_id]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div>
        <Navbar />
      </div>
      <div>
        <h1 style={{ margin: "30px", marginTop: "80px" }}>Your Courses</h1>
        <ul>
          {courses.map(course => (
            <li key={course.course_id}>
              <div className="course-card" style={{ marginTop: 10 ,marginBottom: 20 }}>
                  <h3>{course.course_name}</h3>
                <p>{course.short_description}</p>
                <Link to={`/addCourse/${course.course_id}/week/1`} className="modify-course-button">
                  <button className="modify-button">Modify Course</button>              
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: 30 ,marginLeft: 500,marginBottom: 20 }}>
        <Link to={`/teacher/${teacher_id}/addCourse`} className="add-new-course-button">
          <button className="addnew-button">Add New Course</button>            
        </Link>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default TeacherCourses;
