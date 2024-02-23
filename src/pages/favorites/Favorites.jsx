import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../../components/recipeCard/RecipeCard';
import { AuthContext } from "../../components/AuthContextProvider/AuthContextProvider.jsx";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { authState } = useContext(AuthContext); // Extract authState here
    const username = authState.user?.username; // Optional chaining for safety
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchFavorites = async () => {
            if (username && jwt) {
                try {
                    const response = await axios.get(`https://api.datavortex.nl/yummynow/users/${username}/info`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`,
                        }
                    });

                    setFavorites(response.data); // Set liked recipes from backend response
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };
        fetchFavorites();
    }, [username, jwt]);

    if (!favorites || favorites.length === 0) {
        return <p>No favorites yet.</p>;
    }

    return (
        <div>
            {favorites.map((recipe, index) => (
                <Card
                    key={index}
                    recipe={recipe} // Pass recipe object directly to Card component
                />
            ))}
        </div>
    );
}

export default Favorites;
