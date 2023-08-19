import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

function CourseDetails() {
    const { course_id } = useParams();
    const [courseDetails, setCourseDetails] = useState({});

    useEffect(() => {
        fetch(`/courses/${course_id}`)
            .then(response => response.json())
            .then(data => setCourseDetails(data.course))
            .catch(error => console.error('Error fetching course details:', error));
    }, [course_id]);

    // Render a loading message if courseDetails is empty
    if (Object.keys(courseDetails).length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="App">
            <Navbar />
            <h1>{course_id}</h1>
            <h1>{courseDetails.course_name}</h1>
            <p>{courseDetails.short_description}</p>
            <p>{courseDetails.long_description}</p>
            <Footer />
        </div>
    );
}


export default CourseDetails;
