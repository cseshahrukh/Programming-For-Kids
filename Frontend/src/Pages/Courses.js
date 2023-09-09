import React, { useState, useEffect } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarStudent from "./NavbarStudent";
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

function Courses() {
    console.log("Courses");
    const { username } = useParams();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { user } = useUserContext(); // Get user data from context
    const isAuthenticated = useAuth(); // Use the custom hook

    // Use useEffect to handle the redirection
    useEffect(() => {
        if (!isAuthenticated) {
            // Redirect to the login page
            navigate('/login');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetch('/courses')
            .then(response => response.json())
            .then(data => setCourses(data.courses))
            .catch(error => console.error('Error fetching course:', error));
    }, []);

    if (!user) {
        // Return null when user is null (unauthenticated)
        return null;
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>
                <NavbarStudent username={username}/>
            </div>
            <div >
                <h1 style={{ margin: "30px", marginTop: "80px" }}>Courses</h1>
                <ul>
                    {courses.map(course => (
                        <li key={course.course_id}>
                            <div className="course-card">
                                <Link to={`/student/${username}/courses/${course.course_id}`} className="course-link">
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
