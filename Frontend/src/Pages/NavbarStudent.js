import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';

function NavbarStudent({username}) {
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchChange = (event) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);

        // Fetch suggestions when the search query changes
        fetchSuggestions(newQuery);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/courses/search/${searchQuery}`);
    };

    const fetchSuggestions = (query) => {
        // Fetch suggestions from your backend API
        fetch(`/courses/search-suggestions?query=${query}`)
            .then(response => response.json())
            .then(data => setSuggestions(data.suggestions))
            .catch(error => console.error('Error fetching suggestions:', error));
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Programming For Kids</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* ... rest of the navigation items */}
                        
                        <li className="nav-item">
                            <Link className="nav-link active fancy-link" aria-current="page" to={`/student/${username}/courses`}>Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fancy-link" aria-current="page" to={`/student/${username}/dashboard`}>Dashboard</Link>
                        </li>
                        
                    </ul>
                    {/* Add Search input */}
                    <div className="d-flex position-relative">
                        <form onSubmit={handleSearchSubmit} className="me-2">
                            <input
                                type="text"
                                placeholder="Search Courses"
                                className="form-control"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                        {/* Display suggestions below the search bar */}
                        {suggestions.length > 0 && (
                            <div className="suggestions-box position-absolute bg-white border rounded mt-5 w-100">
                                <ul className="suggestions list-unstyled m-0 p-2">
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index}>
                                            <Link to={`/student/${username}/courses/search/${suggestion}`}>{suggestion}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {user ? (
                            <>
                                <button onClick={handleLogout} className="btn btn-outline-light fancy-button">Logout</button>
                                {/* You can add other buttons here */}
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                                {/* You can add more buttons for non-logged in users */}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarStudent;
