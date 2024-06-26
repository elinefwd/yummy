import axios from 'axios';

const handleLikeHelper = async (authState, recipe, jwt, updateLikedRecipes, setLiked, setShowPopup) => {

    if (authState && authState.user && authState.user.username) {
        const updatedLikedRecipes = [...authState.likedRecipes, recipe];
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
            updateLikedRecipes(updatedLikedRecipes);
            setLiked(true);
        } catch (error) {
            throw new Error("The page has not been found. We apologize for the inconvenience.");
        }
    } else {
        setShowPopup(true); // Show the popup for not logged in users
    }
};

export default handleLikeHelper;
