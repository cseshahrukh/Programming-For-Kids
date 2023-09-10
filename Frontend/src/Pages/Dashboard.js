// Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate, Link,useParams } from "react-router-dom";
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook
import Footer from './Footer';
import NavbarStudent from './NavbarStudent';
import Profile from './Profile';

function Dashboard() {
  const { username } = useParams();
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

  if (!user) {
    // Return null when user is null (unauthenticated)
    return null;
  }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>
                <NavbarStudent username={username}/>
            </div>
            <div style={{ marginTop: '60px', textAlign: 'center' }}>
                <h2>Your Dashboard</h2>
                <div>
                    <Link to={`/student/${username}/courses`} className="btn btn-primary">Browse Courses</Link>
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




