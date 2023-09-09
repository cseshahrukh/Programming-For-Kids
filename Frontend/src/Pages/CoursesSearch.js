import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarStudent from "./NavbarStudent";

function CoursesSearch() {
    console.log("CoursesSearch");

    const { searchQuery } = useParams(); // Get the search query from the URL parameter

    console.log("searchQuery:", searchQuery);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Fetch data based on the search query
        fetch(`/courses/search=${searchQuery}`)
            .then(response => response.json())
            .then(data => setSearchResults(data.searchResults))
            .catch(error => console.error('Error fetching search results:', error));
    }, [searchQuery]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>
                <NavbarStudent />
            </div>
            <div >
                <h1 style={{ margin: "30px", marginTop: "80px" }}>Search Results for "{searchQuery}"</h1>
                <ul>
                    {searchResults.map(course => (
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

export default CoursesSearch;
