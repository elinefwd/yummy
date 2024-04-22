import React, { useContext, useState } from 'react';
import axios from 'axios';
import './RecipeCard.css';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import handleLikeHelper from "../../helpers/likeHelper.jsx";
import handleRemoveHelper from "../../helpers/removeHelper.jsx";

function Card({ recipe, isFavoritePage = false }) {
    const { authState, updateLikedRecipes } = useContext(AuthContext);
    const [liked, setLiked] = useState(authState.likedRecipes.some((likedRecipe) => likedRecipe === recipe));
    const jwt = localStorage.getItem('jwt');

    const [showPopup, setShowPopup] = useState(false);

    const handleLike = async () => {
        handleLikeHelper(authState, recipe, jwt, updateLikedRecipes, setLiked, setShowPopup);
    };

    const handleRemove = async () => {
        handleRemoveHelper(authState, recipe, jwt, updateLikedRecipes, setLiked); // Use the new helper function
    };

    const buttonAction = isFavoritePage ? handleRemove : handleLike;
    const buttonText = isFavoritePage ? 'Remove' : liked ? 'Liked' : 'Like';

    return (
        <div className="card">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{Array.isArray(recipe.instructions) ? recipe.instructions.join(', ') : "No instructions available."}</p>
            <a href={recipe.shareLink} target="_blank" rel="noopener noreferrer"><u>Link to the recipe</u></a>
            <button className={`like-button ${isFavoritePage ? 'remove-button' : (liked ? 'liked' : '')}`} onClick={buttonAction}>
                {buttonText}
            </button>
            {showPopup && <div className="popup">You need to be logged in to use the like function</div>}
        </div>
    );
}

export default Card;
