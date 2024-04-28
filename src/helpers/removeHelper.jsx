import axios from 'axios';

const handleRemoveHelper = async (authState, recipe, jwt, updateLikedRecipes, setLiked) => {


    const updatedLikedRecipes = authState.likedRecipes.filter((likedRecipe) => likedRecipe !== recipe);

    try {
        await axios.put(
            `https://api.datavortex.nl/yummynow/users/${authState.user.username}`,
            {info: JSON.stringify(updatedLikedRecipes)},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                }
            }
        );

        updateLikedRecipes(updatedLikedRecipes); // Update likedRecipes in AuthContext
        setLiked(false);
        localStorage.setItem('likedRecipes', JSON.stringify(updatedLikedRecipes));
    } catch (error) {
        throw new Error("The page has not been found. We apologize for the inconvenience.");
    }
};

export default handleRemoveHelper;

