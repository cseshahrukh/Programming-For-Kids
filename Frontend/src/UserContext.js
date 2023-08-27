import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook to access the context
export function useUserContext() {
    return useContext(UserContext);
}

// Create a provider component to wrap your app with
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        username: '',
        email: '',
        // You can add more user data fields here
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
