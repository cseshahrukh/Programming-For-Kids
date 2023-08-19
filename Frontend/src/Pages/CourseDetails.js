import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

function CourseDetails() {
    const { course_id } = useParams(); // Get the courseId from URL params
    const [courseDetails, setCourseDetails] = useState({});

    useEffect(() => {
        fetch(`/courses/${course_id}`)
            .then(response => response.json())
            .then(data => setCourseDetails(data))
            .catch(error => console.error('Error fetching course details:', error));
    }, [course_id]);

    return (
        <div className="App">
            <div>
                <Navbar />
                <div>
                    <p>HELOOOLLLLOO</p>
                    <h1>hoooo</h1>
                    <h1>{course_id}</h1>
                    <h1>{courseDetails.course_name}</h1>
                    <p>{courseDetails.short_description}</p>
                    <p>{courseDetails.long_description}</p>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default CourseDetails;
