import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook

function PrivateRoute({ path, ...props }) {
    const { user } = useUserContext(); // Get user from context

    if (!user) {
        // If user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If user is authenticated, render the requested route
    return <Route {...props} path={path} />;
}

export default PrivateRoute;
