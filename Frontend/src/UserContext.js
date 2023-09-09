// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const authenticated = !!user; // Check if user data exists

  return (
    <UserContext.Provider value={{ user, setUser, authenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

















// import React, { createContext, useContext, useState } from 'react';

// // Create the context
// const UserContext = createContext();

// // Create a custom hook to access the context
// export function useUserContext() {
//     return useContext(UserContext);
// }

// // Create a provider component to wrap your app with
// export function UserProvider({ children }) {
//     const [user, setUser] = useState({
//         username: '',
//         email: '',
//         // You can add more user data fields here
//     });

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }
