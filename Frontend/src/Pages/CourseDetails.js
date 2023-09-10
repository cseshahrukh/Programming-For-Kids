import React, { useState, useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarStudent from "./NavbarStudent";

function CourseDetails() {
    const { username,course_id } = useParams();
    const [courseDetails, setCourseDetails] = useState({});
    const [selectedWeek, setSelectedWeek] = useState(1); // Initialize with week 1
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

    useEffect(() => {
        fetch(`/courses/${course_id}`)
            .then(response => response.json())
            .then(data => setCourseDetails(data.course))
            .catch(error => console.error('Error fetching course details:', error));
    }, [course_id]);

    if (!user) {
        // Return null when user is null (unauthenticated)
        return null;
    }

    // Render a loading message if courseDetails is empty
    if (Object.keys(courseDetails).length === 0) {
        return <p>Loading...</p>;
    }

    // Get the total number of weeks from course details
    const totalWeeks = courseDetails.total_week;

    // Generate an array of week numbers
    const weekNumbers = Array.from({ length: totalWeeks }, (_, index) => index + 1);

    return (
        <div className="App" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavbarStudent username={username}/>

            {/* Main Content */}
            <div style={{ display: "flex", flex: 1 }}>
                {/* Left Content */}
                <div style={{ flex: 3 }}>
                    <h1>{course_id}</h1>
                    <h1>{courseDetails.course_name}</h1>
                    <p>{courseDetails.short_description}</p>
                    <p className="left-align" style={{ textAlign: "left" }}>
                        {courseDetails.long_description}
                    </p>
                    <Link to={`/student/${username}/courses/${course_id}/week/1/lesson/1/readingMaterials`}>
                        <button className="btn btn-primary" style={{ backgroundColor: "green" }}>
                            Start
                        </button>
                    </Link>
                </div>

                {/* Right Sidebar */}
                <div style={{ flex: 1, backgroundColor: "#f4f4f4", paddingLeft: "10px" }}>
                    <h3>Weeks</h3>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}>
                        {weekNumbers.map(weekNo => (
                            <div key={weekNo} style={{ marginBottom: "5px" }}>
                                <Link to={`/student/${username}/courses/${course_id}/${weekNo}`}>
                                    Week {weekNo}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Discussion Option */}
                    <div style={{ marginTop: "20px" }}>
                        <Link to={`/student/${username}/courses/${course_id}/discussion`}>
                            Discussion
                        </Link>
                    </div>

                    {/* Grade Option */}
                    <div style={{ marginTop: "20px" }}>
                        <Link to={`/student/${username}/courses/${course_id}/grade`}>
                            Grade
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default CourseDetails;
