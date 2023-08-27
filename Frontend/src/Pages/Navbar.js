import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/addCourse">Add Course</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/courses">Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/problems">Playground</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/mcq">MCQ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/problems">Problem</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/reading-materials">Reading Materials</Link>
                        </li>
                    </ul>
                    {/* Add Login and Sign Up buttons */}
                    <div className="d-flex">
                        <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
