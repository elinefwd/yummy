import React, { useContext, useState } from 'react';
import axios from 'axios';
import './RecipeCard.css';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import favorites from "../../pages/favorites/Favorites.jsx";

function Card({ recipe }) {
    const { authState, updateLikedRecipes } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const username = authState.user.username;
    const jwt = localStorage.getItem('jwt');

    const handleLike = async () => {
        if (!liked) {
            console.log('recipe', recipe);
            try {
                const likedRecipesArray = [...authState.likedRecipes, recipe]; // Construct array of liked recipes
                const payload = JSON.stringify(likedRecipesArray); // Serialize array to JSON

                await axios.put(
                    `https://api.datavortex.nl/yummynow/users/${username}`,
                    { info: payload }, // Send array of liked recipes in the payload
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`,
                        }
                    }
                );

                updateLikedRecipes(likedRecipesArray); // Update likedRecipes in the context
                setLiked(true);
                console.log('Added to favorites', recipe);
            } catch (error) {
                console.error('Error while adding to favorites:', error);
            }
        }
    };

    return (
        <div className="card">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{Array.isArray(recipe.instructions) ? recipe.instructions.join(', ') : "No instructions available."}</p>
            <a href={recipe.shareLink} target="_blank" rel="noopener noreferrer">Link to the recipe</a>
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
                {liked ? 'Liked' : 'Like'}
            </button>
        </div>
    );
}

export default Card;
