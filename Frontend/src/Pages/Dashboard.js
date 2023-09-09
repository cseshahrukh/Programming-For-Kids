// Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from '../UserContext'; // Import the useUserContext hook
import { useAuth } from '../useAuth'; // Import the custom hook
import Footer from './Footer';
import NavbarStudent from './NavbarStudent';
import Profile from './Profile';

function Dashboard() {
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



// import React from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import Footer from './Footer';
// import NavbarStudent from './NavbarStudent';
// import Profile from './Profile';
// import { useUserContext } from '../UserContext'; // Import the useUserContext hook

// function Dashboard() {
//     const { user } = useUserContext(); // Get user from context

//     if (!user) {
//         console.log('User not logged in. Redirecting to home page...');
//         // If user is not logged in, redirect to the home page
//         return <Navigate to="/" />;
//     }
//     else 
//     return (
//         <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//             <div>
//                 <NavbarStudent />
//             </div>
//             <div style={{ marginTop: '60px', textAlign: 'center' }}>
//                 <h2>Your Dashboard</h2>
//                 <div>
//                     <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
//                     {/* Add more dashboard options/buttons */}
//                 </div>
//             </div>
//             <div>
//                 <h1>Dashboard</h1>
//                 <Profile /> {/* Include the Profile component */}
//                 {/* Other dashboard content */}
//             </div>
//             <div >
//                 <Footer />
//             </div>
//         </div>
//     );
// }

// export default Dashboard;
