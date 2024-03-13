import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from "axios";

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

            if (decoded.likedRecipes) {
                setAuthState({
                    user: {
                        username: decoded.sub,
                        id: decoded.id,
                    },
                    status: 'done',
                    likedRecipes: decoded.likedRecipes
                });
            } else {
                setAuthState({
                    user: {
                        username: decoded.sub,
                        id: decoded.id,
                    },
                    status: 'done',
                    likedRecipes: []
                });
            }
        } else {
            setAuthState({
                user: null,
                status: 'done',
                likedRecipes: []
            });
        }
    }, []);

    const login = async (jwt) => {
        const decoded = jwtDecode(jwt);

        localStorage.setItem('jwt', jwt);

        // Fetch the user's favorites from the backend
        try {
            const response = await axios.get(
                `https://api.datavortex.nl/yummynow/users/${decoded.sub}/info`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            const storedLikedRecipes = Array.isArray(response.data) ? response.data : [];

            setAuthState({
                user: {
                    username: decoded.sub,
                    id: decoded.id,
                },
                status: 'done',
                likedRecipes: storedLikedRecipes
            });
        } catch (error) {
            console.error('Error fetching user favorites:', error);
        }
    };


    const logout = () => {
        localStorage.removeItem('jwt');
        setAuthState({ user: null, status: 'done', likedRecipes: [] }); // Clear liked recipes on logout
    };



    const updateLikedRecipes = (newLikedRecipes) => {
        setAuthState(prevState => ({
            ...prevState,
            likedRecipes: [...prevState.likedRecipes, ...newLikedRecipes]
        }));

    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, updateLikedRecipes }}>
            {authState.status === 'pending' ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;