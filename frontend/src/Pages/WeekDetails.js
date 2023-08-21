import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

function WeekDetails() {
    const { course_id, week_no } = useParams();
    const [readingMaterials, setReadingMaterials] = useState({});
    const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
    const contentRef = useRef(null); // Reference to the main content container

    useEffect(() => {
        fetch(`/courses/reading_materials/${course_id}/${week_no}`)
            .then(response => response.json())
            .then(data => setReadingMaterials(data))
            .catch(error => console.error('Error fetching reading materials:', error));
    }, [course_id, week_no]);

    // Scroll to the selected lesson when its index changes
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: contentRef.current.scrollHeight * selectedLessonIndex / Object.keys(readingMaterials).length,
                behavior: "smooth"
            });
        }
    }, [selectedLessonIndex, readingMaterials]);

    return (
        <div className="week-details" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div className="content-container" style={{ display: "flex", flex: 1, marginTop: "70px" }}>
                <div className="main-content" style={{ flex: 3, padding: "20px" }} ref={contentRef}>
                    <h1>Week {week_no} Details</h1>
                    {Object.keys(readingMaterials).length > 0 ? (
                        <div>
                            {Object.values(readingMaterials).map((lesson, index) => (
                                <div key={lesson.lesson_id} id={`lesson-${index}`}>
                                    {index !== 0 && <hr style={{ margin: "20px 0" }} />}
                                    <h3>Lesson Title: {lesson.lesson_title} </h3>
                                    {lesson.sections && lesson.sections.length > 0 ? (
                                        <div>
                                            {lesson.sections.map((section) => (
                                                <div key={section.section_title}>
                                                    <h4>{section.section_title}</h4>
                                                    <p>{section.section_content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No sections available for this lesson.</p>
                                    )}
                                    <div style={{ marginTop: "10px" }}>
                                        <Link to={`/courses/${course_id}/${week_no}/${lesson.lesson_id}/mcq`}>
                                            <button className="btn btn-primary mr-2">MCQ Section</button>
                                        </Link>
                                        <Link to={`/courses/${course_id}/${week_no}/${lesson.lesson_id}/programming`}>
                                            <button className="btn btn-success">Programming Problem</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reading materials available for this week.</p>
                    )}
                </div>
                <div className="right-sidebar" style={{ flex: 1, overflowY: "auto", borderLeft: "1px solid #ccc", padding: "20px" }}>
                    <h3>Lessons</h3>
                    {Object.values(readingMaterials).map((lesson, index) => (
                        <div
                            key={lesson.lesson_id}
                            className={`lesson-title ${selectedLessonIndex === index ? 'highlighted' : ''}`}
                            onClick={() => setSelectedLessonIndex(index)}
                        >
                            Lesson {index + 1}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WeekDetails;
