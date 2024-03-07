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
                        `https://api.datavortex.nl/yummynow/users/${username}/info`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${jwt}`,
                            },
                        }
                    );
                    console.log ('array', Array.isArray(response.data))
                    console.log ('response.data', response.data)
                    if (Array.isArray(response.data)) {
                        setFavorites(response.data);
                    } else {
                        setFavorites([]);
                    }
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };
        fetchFavorites();
    }, [username, jwt]); // Fetch favorites on initial load or any change in username/jwt

    const emptyFavorites = async () => {
        try {
            // Clear favorites only when the button is clicked
            await axios.put(
                `https://api.datavortex.nl/yummynow/users/${username}`,
                { info: " " },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            setFavorites([]); // Update the state only if the favorites are successfully cleared
            console.log('Favorites emptied successfully.');
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