import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook

function NavbarStudent() {
    const navigate = useNavigate();
    const { user, setUser } = useUserContext(); // Get user and setUser from context

    const handleLogout = () => {
        console.log('Logging out...');
        // Clear user context and perform logout logic
        setUser(null); // Clear user data from context
        // Perform any other logout-related actions
        console.log('User data cleared from context.');
        // Navigate to home page or any other desired page
        navigate('/');
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Implement your search logic using the searchQuery value
        navigate(`/courses?search=${searchQuery}`);
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
                            <Link className="nav-link active fancy-link" aria-current="page" to="/courses">Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fancy-link" aria-current="page" to="/dashboard">Dashboard</Link>
                        </li>
                        
                        
                        
                    </ul>
                    {/* Add Search input */}
                    <div className="d-flex">
                        <form onSubmit={handleSearchSubmit} className="me-2">
                            <input
                                type="text"
                                placeholder="Search Courses"
                                className="form-control"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                        {user ? (
                            <button onClick={handleLogout} className="btn btn-outline-light fancy-button">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarStudent;
