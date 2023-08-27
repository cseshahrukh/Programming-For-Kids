import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import Profile from './Profile';
function Dashboard() {
    // Replace this with the actual user data fetched from the backend
    

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>
                <Navbar />
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
