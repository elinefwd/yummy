import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setAuthState({
                user: {
                    username: decoded.username,
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

    const login = (jwt) => {
        const decoded = jwtDecode(jwt);
        localStorage.setItem('jwt', jwt);
        setAuthState({
            user: {
                username: decoded.sub,
                id: decoded.id,
            },
            status: 'done',
        });
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        setAuthState({ user: null, status: 'done' });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {authState.status === 'pending' ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
