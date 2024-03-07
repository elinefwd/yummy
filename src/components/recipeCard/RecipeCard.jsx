import React, { useContext, useState } from 'react';
import axios from 'axios';
import './RecipeCard.css';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';

function Card({ recipe, isFavoritePage = false }) {
    const { authState, updateLikedRecipes } = useContext(AuthContext);
    const [liked, setLiked] = useState(authState.likedRecipes.some((likedRecipe) => likedRecipe === recipe));
    const jwt = localStorage.getItem('jwt');

    const [showPopup, setShowPopup] = useState(false);

    const handleLike = async () => {
        if (authState && authState.user && authState.user.username) {
            const alreadyLiked = authState.likedRecipes.some((likedRecipe) => likedRecipe === recipe);
            if (alreadyLiked) {
                // Unlike the recipe
                const updatedLikedRecipes = authState.likedRecipes.filter((likedRecipe) => likedRecipe !== recipe);
                try {
                    await axios.put(
                        `https://api.yourbackend.com/users/${authState.user.username}`,
                        { info: JSON.stringify(updatedLikedRecipes) },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${jwt}`,
                            }
                        }
                    );
                    updateLikedRecipes(updatedLikedRecipes);
                    setLiked(false);
                } catch (error) {
                    console.error('Error while unliking the recipe:', error);
                }
            } else {
                // Like the recipe
                const updatedLikedRecipes = [...authState.likedRecipes, recipe];
                try {
                    await axios.put(
                        `https://api.yourbackend.com/users/${authState.user.username}`,
                        { info: JSON.stringify(updatedLikedRecipes) },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${jwt}`,
                            }
                        }
                    );
                    updateLikedRecipes(updatedLikedRecipes);
                    setLiked(true);
                } catch (error) {
                    console.error('Error while liking the recipe:', error);
                }
            }
        } else {
            setShowPopup(true); // Show the popup for not logged-in users
        }
    };

    const buttonText = isFavoritePage ? 'Liked' : liked ? 'Unlike' : 'Like';

    return (
        <div className="card">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{Array.isArray(recipe.instructions) ? recipe.instructions.join(', ') : "No instructions available."}</p>
            <a href={recipe.shareLink} target="_blank" rel="noopener noreferrer">Link to the recipe</a>
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
                {buttonText}
            </button>
            {showPopup && <div className="popup">You need to be logged in to use the like function</div>}
        </div>
    );
}

export default Card;

