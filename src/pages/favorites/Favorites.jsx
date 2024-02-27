import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../../components/recipeCard/RecipeCard';
import { AuthContext } from "../../components/AuthContextProvider/AuthContextProvider.jsx";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { authState, updateLikedRecipes } = useContext(AuthContext);
    const username = authState.user?.username;
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        // Fetch the initial list of favorite recipes
        const fetchFavorites = async () => {
            if (username && jwt) {
                try {
                    const response = await axios.get(
                        `https://api.datavortex.nl/yummynow/users/${username}/info`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${jwt}`,
                            },
                        }
                    );
                    setFavorites(response.data); // Adjust this line based on your data structure
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };
        fetchFavorites();
    }, [username, jwt]);

    const handleRemoveFromFavorites = async (recipeToRemove) => {
        // Update the favorites locally to immediately reflect the change in the UI
        const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeToRemove.id);
        setFavorites(updatedFavorites);

        // Optionally, update the application state if you're maintaining it
        updateLikedRecipes(updatedFavorites); // This assumes you have such a function in your context

        // Send the updated list to the server
        try {
            await axios.put(
                `https://api.datavortex.nl/yummynow/users/${username}`,
                { info: JSON.stringify(updatedFavorites) }, // Adjust payload structure as necessary
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Favorites updated successfully.");
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    if (!favorites || favorites.length === 0) {
        return <p>No favorites yet.</p>;
    }

    return (
        <div>
            {favorites.map((recipe) => (
                <Card
                    key={recipe.id}
                    recipe={recipe}
                    isFavoritePage={true}
                    onRemove={handleRemoveFromFavorites} // Passing the handler to each Card
                />
            ))}
        </div>
    );
}

export default Favorites;
