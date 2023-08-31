import React from 'react';

function Navbar() {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Programming For Kids</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/addCourse/101/week/1/lesson/1/readingMaterials">Add Course</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/courses">Courses</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/problems">Playground</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/mcq">MCQ</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" href="/problems">Problem</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" href="/reading-materials">Reading Materials</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;