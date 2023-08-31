import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Footer from './Footer';
import NavbarStudent from './NavbarStudent';
import Profile from './Profile';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook

function Dashboard() {
    const { user } = useUserContext(); // Get user from context

    if (!user) {
        console.log('User not logged in. Redirecting to home page...');
        // If user is not logged in, redirect to the home page
        return <Navigate to="/" />;
    }
    else 
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>
                <NavbarStudent />
            </div>
            <div style={{ marginTop: '60px', textAlign: 'center' }}>
                <h2>Your Dashboard</h2>
                <div>
                    <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                    {/* Add more dashboard options/buttons */}
                </div>
            </div>
            <div>
                <h1>Dashboard</h1>
                <Profile /> {/* Include the Profile component */}
                {/* Other dashboard content */}
            </div>
            <div >
                <Footer />
            </div>
        </div>
    );
}

export default Dashboard;
