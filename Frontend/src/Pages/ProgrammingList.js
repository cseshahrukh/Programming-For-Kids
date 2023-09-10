import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarStudent from "./NavbarStudent";

function ProgrammingList() {
    const { course_id, week_no, lesson_id } = useParams();
    const [programmingProblems, setProgrammingProblems] = useState([]);

    useEffect(() => {
        fetch(`/courses/problems/${course_id}/${week_no}/${lesson_id}`)
            .then(response => response.json())
            .then(data => setProgrammingProblems(data.problems))
            .catch(error => console.error('Error fetching programming problems:', error));
    }, [course_id, week_no, lesson_id]);

    return (
        <div className="programming-details" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavbarStudent />
            <div style={{ flex: 1 }}>
                <h1>Programming Problems for Week {week_no}, Lesson {lesson_id}</h1>
                <ul>
                    {programmingProblems.length > 0 ? (
                        programmingProblems.map((problem, index) => (
                            <li key={index}>
                                <h3>{problem.question}</h3>
                                <Link to={`/courses/${course_id}/${week_no}/${lesson_id}/programming/${problem.problem_id}`}>
                                    <button className="btn btn-success">Solve Problem</button>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No programming problems available for this lesson.</p>
                    )}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default ProgrammingList;
