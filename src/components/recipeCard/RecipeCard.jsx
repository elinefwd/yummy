import React, { useState } from 'react';
import axios from 'axios';
import './RecipeCard.css';

function Card({ recipe, username }) {
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        if (!liked) {
            try {
                await axios.put(
                    `https://api.datavortex.nl/yummynow/users/${username}`,
                    recipe,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'yummynow:xL5T8mawKxLSD7GWHLTF' // Replace with your actual API key
                        }
                    }
                );
                setLiked(true);
            } catch (error) {
                console.error('Error while adding to favorites:', error);
                // Handle error, possibly show a notification to the user
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
