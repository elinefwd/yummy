import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import './RecipeCard.css'; // Make sure the path to the CSS file is correct

function Card({ recipe, username }) { // Added username prop for the API request

    // State to manage the liked status of a recipe
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        if (!liked) { // Only attempt to add to favorites if it's not already liked
            try {
                const response = await axios.put(
                    `https://api.datavortex.nl/yummynow/users/${username}/info`,
                    recipe,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'yummynow:xL5T8mawKxLSD7GWHLTF' // Your API key should be kept confidential and secure
                        }
                    }
                );
                setLiked(true); // Update the liked status
                // Optionally, process response here ...
            } catch (error) {
                console.error('Error while adding to favorites:', error);
                // Handle error (e.g., show a notification to the user)
            }
        }
    };


    return (
        <div className="card">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{Array.isArray(recipe.instructions) ? recipe.instructions.join(', ') : "No instructions available."}</p>
            <a href={recipe.shareLink} target="_blank" rel="noopener noreferrer">Link to recipe</a>
            {/* Add a Like button */}
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
                {liked ? 'Liked' : 'Like'}
            </button>
        </div>
    );
}

export default Card;
