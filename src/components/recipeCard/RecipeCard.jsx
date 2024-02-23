import React, { useContext, useState } from 'react';
import axios from 'axios';
import './RecipeCard.css';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import favorites from "../../pages/favorites/Favorites.jsx"; // Updated import

function Card({ recipe }) {
    const { authState, updateLikedRecipes } = useContext(AuthContext); // Accessing authState and updateLikedRecipes from AuthContext
    const [liked, setLiked] = useState(false);
    const username = authState.user.username;
    const jwt = localStorage.getItem('jwt');

    const handleLike = async () => {
        if (!liked) {
          console.log('recipe', recipe);
            try {
                await axios.put(
                    `https://api.datavortex.nl/yummynow/users/${username}`, // Update the API endpoint as per your requirements
                    { info : JSON.stringify(recipe) }, // Update the payload as needed
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`,
                        }
                    }
                );

                // Update likedRecipes in the context after successful like
                const newLikedRecipes = [...authState.likedRecipes, recipe];
                updateLikedRecipes(newLikedRecipes);
                setLiked(true); // Update local state to reflect the recipe is now liked
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
