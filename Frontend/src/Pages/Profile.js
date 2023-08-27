import React, { useState } from 'react';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook

function Profile() {
    const { user, setUser } = useUserContext(); // Get user and setUser from context

    const updateProfile = () => {
        // Update user's username
        setUser(prevUser => ({
            ...prevUser,
            username: 'newUsername'
        }));
    };

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={updateProfile}>Update Username</button>
        </div>
    );
}

export default Profile;
