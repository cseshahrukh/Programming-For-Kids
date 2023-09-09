import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

import Footer from "./Footer";
import Navbar from "./Navbar";

function WeekDetails() {
    const { course_id, week_no } = useParams();
    const [readingMaterials, setReadingMaterials] = useState([]);

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
        fetch(`/courses/reading_materials/${course_id}/${week_no}`)
            .then(response => response.json())
            .then(data => setReadingMaterials(data.reading_materials))
            .catch(error => console.error('Error fetching reading materials:', error));
    }, [course_id, week_no]);

    if (!user) {
        // Return null when user is null (unauthenticated)
        return null;
    }

    return (
        <div className="week-details" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <h1>Week {week_no} Details</h1>
                {readingMaterials.length > 0 ? (
                    <ul>
                        {readingMaterials.map((material) => (
                            <li key={material.lesson_id}>
                                <h3>{material.section_title}</h3>
                                <p>{material.section_content}</p>
                                <Link to={`/courses/${course_id}/${week_no}/${material.lesson_id}/mcq`}>
                                    <button className="btn btn-primary mr-2">MCQ Section</button>
                                </Link>
                                <Link to={`/courses/${course_id}/${week_no}/${material.lesson_id}/programming`}>
                                    <button className="btn btn-success" style={{ marginLeft: "10px" }}>Programming Problem</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reading materials available for this week.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default WeekDetails;