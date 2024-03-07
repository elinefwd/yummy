import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../../components/recipeCard/RecipeCard';
import { AuthContext } from '../../components/AuthContextProvider/AuthContextProvider.jsx';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { authState } = useContext(AuthContext);
    const username = authState.user?.username;
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchFavorites = async () => {
            if (username && jwt) {
                try {
                    const response = await axios.get(
                        `https://api.yourbackend.com/users/${username}/favorites`, // Ensure this matches your actual API endpoint.
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${jwt}`,
                            },
                        }
                    );
                    // Handle response to ensure it's in the expected format.
                    setFavorites(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        fetchFavorites();
    }, [username, jwt]);

    const emptyFavorites = async () => {
        if (!username || !jwt) return; // Add guard clause for safety

        try {
            await axios.put(
                `https://api.yourbackend.com/users/${username}/favorites/clear`, // Endpoint that clears the user's favorites. Adjust as necessary.
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            setFavorites([]);
        } catch (error) {
            console.error('Error emptying favorites:', error);
        }
    };

    return (
        <div>
            {favorites.length > 0 ? (
                <>
                    {favorites.map((recipe) => (
                        <Card
                            key={recipe.id}
                            recipe={recipe}
                            isFavoritePage={true}
                        />
                    ))}
                    <button onClick={emptyFavorites}>Empty Favorites</button>
                </>
            ) : (
                <p>No favorites yet.</p>
            )}
        </div>
    );
}

export default Favorites;
