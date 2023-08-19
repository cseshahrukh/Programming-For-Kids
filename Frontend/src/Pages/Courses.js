import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Courses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/courses')
            .then(response => response.json())
            .then(data => setCourses(data.courses))
            .catch(error => console.error('Error fetching course:', error));
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <h1>Courses</h1>
                <ul>
                    {courses.map(course => (
                        <li key={course.course_id}>
                            <button>
                                <Link to={`/courses/${course.course_id}`}> {/* Use Link component to create dynamic route */}
                                    <h3>{course.course_name}</h3>
                                </Link>
                            </button>
                            <p>{course.short_description}</p>
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
