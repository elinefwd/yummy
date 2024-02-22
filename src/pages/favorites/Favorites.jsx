import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../../components/recipeCard/RecipeCard';
import { AuthContext } from "../../components/AuthContextProvider/AuthContextProvider.jsx";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { authState, likedRecipes } = useContext(AuthContext); // Correctly extract likedRecipes here
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
                    // setFavorites(response.data.favorites || []); // Ensure response.data.favorites is not undefined
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };
        fetchFavorites();
    }, [username, jwt]);

    useEffect(() => {
        // Now directly using likedRecipes from AuthContext
        setFavorites(likedRecipes);
    }, [likedRecipes]); // Listen for changes in likedRecipes

    if (!favorites || favorites.length === 0) {
        return <p>No favorites yet.</p>;
    }

    return (
        <div>
            {favorites.map((recipe, index) => (
                <Card
                    key={index} // Advised to use a unique identifier if available
                    recipe={{
                        image: recipe.image,
                        name: recipe.label,
                        instructions: recipe.ingredientLines,
                        shareLink: recipe.url
                    }}
                />
            ))}
        </div>
    );
}

export default Favorites;
