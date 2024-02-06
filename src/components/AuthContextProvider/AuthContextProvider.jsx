// post request to backend
// get token from backend
// decode token
// add token to request header
// put data in local storage
// persist on refresh using useEffect and useState

// auth-context.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // You might want to use a more complex state object based on your authentication needs

    const login = (userData) => {
        // Perform login logic and set the user state
        setUser(userData);
    };

    const logout = () => {
        // Perform logout logic and reset the user state
        setUser(null);
    };

    const isAuthenticated = () => {
        // Check if the user is authenticated based on your criteria
        return !!user;
    };

    const contextValue = {
        user,
        login,
        logout,
        isAuthenticated,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};