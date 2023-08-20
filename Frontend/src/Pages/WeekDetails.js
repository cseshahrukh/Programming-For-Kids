import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

function WeekDetails() {
    const { course_id, week_no } = useParams();
    const [readingMaterials, setReadingMaterials] = useState([]);

    useEffect(() => {
        fetch(`/courses/reading_materials/${course_id}/${week_no}`)
            .then(response => response.json())
            .then(data => setReadingMaterials(data.reading_materials))
            .catch(error => console.error('Error fetching reading materials:', error));
    }, [course_id, week_no]);

    return (
        <div className="week-details" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <h1>Week {week_no} Details</h1>
                <ul>
                    {readingMaterials.map((material, index) => (
                        <li key={index}>
                            <h3>{material.section_title}</h3>
                            <p>{material.section_content}</p>
                            <Link to={`/courses/${course_id}/${week_no}/mcq`}>
                                <button className="btn btn-primary mr-2">MCQ Section</button>
                            </Link>
                            <Link to={`/courses/${course_id}/${week_no}/programming`}>
                                <button className="btn btn-success" style={{ marginLeft: "10px" }}>Programming Problem</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default WeekDetails;
