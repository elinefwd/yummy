import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Corrected import statement
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending', // Initially 'pending' but set to 'done' after initial loading
        likedRecipes: [] // Liked recipes, to be fetched from backend or initialized as empty
    });

    useEffect(() => {
        // Function to check for and validate JWT, then fetch user data or reset authState
        const validateAndFetchUserData = async () => {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setAuthState({ user: null, status: 'done', likedRecipes: [] });
                return;
            }

            try {
                const decoded = jwtDecode(jwt);
                await fetchUserData(jwt, decoded.sub); // Assuming `sub` is the user identifier
            } catch (error) {
                console.error('Error validating token or fetching user data:', error);
                setAuthState({ user: null, status: 'done', likedRecipes: [] });
            }
        };

        validateAndFetchUserData();
    }, []);

    // Function to fetch user data, including liked recipes
    const fetchUserData = async (jwt, username) => {
        try {
            const response = await axios.get(`https://api.yourbackend.com/users/${username}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });

            setAuthState({
                user: { username, id: response.data.userId },
                status: 'done',
                likedRecipes: response.data.likedRecipes || []
            });
        } catch (e) {
            console.error('Error fetching user data:', e);
            setAuthState(prevState => ({ ...prevState, status: 'done' }));
        }
    };

    // Handling user login
    const login = (jwt) => {
        try {
            const decoded = jwtDecode(jwt);
            localStorage.setItem('jwt', jwt);
            fetchUserData(jwt, decoded.sub);
        } catch (error) {
            console.error('Error processing login:', error);
        }
    };

    // Handling user logout
    const logout = () => {
        // Clearing user-related data and maintaining liked recipes
        localStorage.removeItem('jwt'); // Remove JWT token
        setAuthState((prevState) => ({
            ...prevState,
            user: null, // Reset user-related data
        }));
        // You can choose to add additional logout logic if needed

        // Note: Liked recipes are not being cleared here to maintain them even after logout
    };


    // Updating liked recipes
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
