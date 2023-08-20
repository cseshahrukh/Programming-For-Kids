import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from "react-bootstrap"; // Import Navbar components from Bootstrap

function Navbar() {
    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <BootstrapNavbar.Brand as={Link} to="/">Student Portal</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="Courses" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/courses">All Courses</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/enrolled-courses">Enrolled Courses</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/assignments">Assignments</Nav.Link>
                    <Nav.Link as={Link} to="/grades">Grades</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
}

export default Navbar;
