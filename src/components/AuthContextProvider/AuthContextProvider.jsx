import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
        likedRecipes: [
            {
                image: '...',
                name: '...',
                instructions: ['...', '...'],
                shareLink: '...'
            },
            {
                image: '...',
                name: '...',
                instructions: ['...', '...'],
                shareLink: '...'
            },
            // Add more recipes as needed
        ]
    });


    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setAuthState({
                user: {
                    username: decoded.sub,
                    id: decoded.id,
                },
                status: 'done',
                likedRecipes: [] // Initialize with empty array
            });
        } else {
            setAuthState({
                user: null,
                status: 'done',
                likedRecipes: [] // Initialize with empty array
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
            likedRecipes: [] // Clear liked recipes on login
        });
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        setAuthState({ user: null, status: 'done', likedRecipes: [] }); // Clear liked recipes on logout
    };

    const updateLikedRecipes = (newLikedRecipes) => {
        setAuthState(prevState => ({
            ...prevState,
            likedRecipes: [...newLikedRecipes]
        }));


};

    return (
        <AuthContext.Provider value={{ authState, login, logout, updateLikedRecipes }}>
            {authState.status === 'pending' ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
