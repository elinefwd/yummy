import { createContext, useState, useEffect } from 'react';
import  {jwtDecode}  from 'jwt-decode';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
 function AuthProvider  ({ children })  {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem("jwt");  // Retrieve the token with the name "jwt"
        if (token) {
            const decoded = jwtDecode(token);
            setAuthState({
                user: {
                    username: decoded.username,
                    email: decoded.email,
                    id: decoded.id,
                },
                status: 'done',
            });
        } else {
            setAuthState({
                user: null,
                status: 'done',
            });
        }
    }, []);

    const login = (userToken) => {
        const decoded = jwtDecode(userToken);
        console.log (decoded);
        localStorage.setItem("jwt", userToken);  // Store the token with the name "jwt"
        setAuthState({
            user: {
                username: decoded.sub,
                id: decoded.id,
            },
            status: 'done',
        });
    };

    const logout = () => {
        localStorage.removeItem("jwt");  // Remove the token with the name "jwt" from local storage
        setAuthState({ user: null, status: 'done' });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {authState.status === 'pending' ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;