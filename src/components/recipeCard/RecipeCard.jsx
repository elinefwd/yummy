import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeCard.css';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';

function Card({ recipe, isFavoritePage = false, onRemove }) {
    const { authState, updateLikedRecipes } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const username = authState.user.username;
    const jwt = localStorage.getItem('jwt');

    // Determine if the recipe is initially liked when the component mounts
    useEffect(() => {
        const isInitiallyLiked = authState.likedRecipes.some((likedRecipe) => likedRecipe.id === recipe.id);
        setLiked(isInitiallyLiked);
    }, [authState.likedRecipes, recipe.id]);

    const handleLike = async () => {
        // If the card is rendered on the favorites page and the 'Unlike' button is clicked
        if (isFavoritePage && liked) {
            // Perform removal action
            onRemove(recipe);
        } else if (!liked) {
            // Handle liking the recipe (adding to favorites)
            try {
                const likedRecipesArray = [...authState.likedRecipes, recipe];
                await axios.put(
                    `https://api.datavortex.nl/yummynow/users/${username}`,
                    { info: JSON.stringify(likedRecipesArray) },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`,
                        }
                    }
                );
                updateLikedRecipes(likedRecipesArray); // Update likedRecipes in the context
                setLiked(true);
            } catch (error) {
                console.error('Error while adding to favorites:', error);
            }
        }
    };

    const buttonText = isFavoritePage ? 'Unlike' : liked ? 'Liked' : 'Like';

    return (
        <div className="card">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{Array.isArray(recipe.instructions) ? recipe.instructions.join(', ') : "No instructions available."}</p>
            <a href={recipe.shareLink} target="_blank" rel="noopener noreferrer">Link to the recipe</a>
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
                {buttonText}
            </button>
        </div>
    );
}

export default Card;
