// post request to backend
// get token from backend
// decode token
// add token to request header
// put data in local storage
// persist on refresh using useEffect and useState

// auth-context.js
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false); // Example state for login status

    const login = () => {
        // Add your login logic here
        setLoggedIn(true);
    };

    const logout = () => {
        // Add your logout logic here
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
