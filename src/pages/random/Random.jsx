import { useState } from "react";
import fetchData from "../../components/randomRequest/RandomRequest";
import Card from "../../components/recipeCard/RecipeCard.jsx";

function Random() {
    const [recipes, setRecipes] = useState([]);

    const handleButtonClick = async () => {
        try {
            const newRecipes = await fetchData();
            setRecipes(newRecipes);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button onClick={handleButtonClick}>Click me for a random recipe</button>
            <Card recipes={recipes} /> {/* Always render the Card component, it will update when recipes change */}
            <p>Hier hebben we een random optie die ook zonder inloggen of registreren te zien is</p>
        </>
    );
}

export default Random;