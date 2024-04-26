import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Card from '../../components/recipeCard/RecipeCard';
import {AuthContext} from '../../components/AuthContextProvider/AuthContextProvider.jsx';
import handleLikeHelper from "../../helpers/likeHelper.jsx";
import handleRemoveHelper from "../../helpers/removeHelper.jsx";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const {authState, updateLikedRecipes} = useContext(AuthContext);
    const username = authState.user?.username;
    const jwt = localStorage.getItem("jwt");
    const [error, setError] = useState(null);


    const fetchFavorites = async () => {
        if (username && jwt) {
            try {
                const response = await axios.get(
                    `https://api.datavortex.nl/yummynow/users/${username}/info`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                if (Array.isArray(response.data)) {
                    setFavorites(response.data);
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                setError("Error fetching favorites. Please try again.");
            }
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [username, jwt]);

    const handleLike = async (recipe) => {
        await handleLikeHelper(authState, recipe, jwt, updateLikedRecipes);
    };

    const handleRemove = async (recipe) => {
        await handleRemoveHelper(authState, recipe, jwt, updateLikedRecipes);
    };

    useEffect(() => {
        setFavorites(authState.likedRecipes); // Update favorites when likedRecipes change
    }, [authState.likedRecipes]);

    return (
        <div>
            {error && <p className="error-message">{error}</p>}

            {favorites.length > 0 ? (
                favorites.map((recipe, index) => (
                    <Card
                        key={index}
                        recipe={recipe}
                        isFavoritePage={true}
                        handleLike={handleLike}
                        handleRemove={handleRemove}
                    />
                ))
            ) : (
                <p>No favorites yet.</p>
            )}
        </div>
    );
}

export default Favorites;
