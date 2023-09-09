import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarStudent from "./NavbarStudent";
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook

function CoursesSearch() {
    console.log("CoursesSearch");

    const { username,searchQuery } = useParams(); // Get the search query from the URL parameter

    console.log("searchQuery:", searchQuery);
    const [searchResults, setSearchResults] = useState([]);

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
        // Fetch data based on the search query
        fetch(`/courses/search=${searchQuery}`)
            .then(response => response.json())
            .then(data => setSearchResults(data.searchResults))
            .catch(error => console.error('Error fetching search results:', error));
    }, [searchQuery]);

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
                <h1 style={{ margin: "30px", marginTop: "80px" }}>Search Results for "{searchQuery}"</h1>
                <ul>
                    {searchResults.map(course => (
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

export default CoursesSearch;
