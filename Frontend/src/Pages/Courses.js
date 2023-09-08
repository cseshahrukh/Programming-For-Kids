import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarStudent from "./NavbarStudent";

function Courses() {
    console.log("Courses");
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/courses')
            .then(response => response.json())
            .then(data => setCourses(data.courses))
            .catch(error => console.error('Error fetching course:', error));
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>
                <NavbarStudent />
            </div>
            <div >
                <h1 style={{ margin: "30px", marginTop: "80px" }}>Courses</h1>
                <ul>
                    {courses.map(course => (
                        <li key={course.course_id}>
                            <div className="course-card">
                                <Link to={`/courses/${course.course_id}`} className="course-link">
                                    <h3>{course.course_name}</h3>
                                </Link>
                                <p>{course.short_description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Courses;
