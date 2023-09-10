import React, { useState } from 'react';
import { useUserContext } from '../UserContext'; // Import the useUserContext hook

function Profile() {
    const { user, setUser } = useUserContext(); // Get user and setUser from context

    

    return (
        <div>
            {/* <h2>Profile</h2> */}
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            
        </div>
    );
}

export default Profile;
