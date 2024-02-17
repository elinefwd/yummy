
// import React from "react";
// import  "./Favorites.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/recipeCard/RecipeCard';

function Favorites({ username }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (username) {
                try {
                    // Ensure the username is correctly injected into the URL
                    const response = await axios.get(`https://api.datavortex.nl/yummynow/users/${username}/info`);
                    // Set the state with the fetched favorites, assuming they are
                    // contained within the 'favorites' array in the response
                    setFavorites(response.data.favorites);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                    // Handle errors, possibly by updating the state to display an error message
                }
            }
        };

        fetchFavorites();

    }, [username]); // The effect is dependent on the `username`

    // Display a message while the favorites are loading
    if (!favorites || favorites.length === 0) {
        return <p>Loading favorites...</p>;
    }

    return (
        <>
            <p>Top Favorite Dishes</p>
            {/* Display the recipes using the Card component */}
            {favorites.slice(0, 5).map((recipe, index) => (
                <Card key={index} recipe={recipe} username={username} />
            ))}
        </>
    );
}

export default Favorites;
