import { useState } from "react";
import fetchData from "../../components/randomRequest/RandomRequest";
import Card from "../../components/recipeCard/RecipeCard.jsx";
import "./Random.css";

function Random() {
    const [recipes, setRecipes] = useState([]);

    const handleButtonClick = async () => {
        try {
            const newRecipes = await fetchData();
            setRecipes(newRecipes);
            console.log(newRecipes);
        } catch (error) {
            console.error('Failed to fetch random recipes:', error);
        }
    };

    return (
        <>
            <button onClick={handleButtonClick}>Click me for some random recipes</button>
            <div className="recipes-container"> {/* You might want to add some styling for this container */}
                {recipes.map((recipe, index) => (
                    <Card key={recipe.uri || index} recipe={recipe}  />
                    // Assuming recipe.uri is a unique identifier;
                    // If not, use recipe.label or fall back to the index
                ))}
            </div>
            <p>Laat je verassen door random opties.</p>
        </>
    );
}

export default Random;
