import {useState} from "react";
import fetchData from "../../components/RandomRequest/RandomRequest";
import Card from "../../components/RecipeCard/RecipeCard.jsx";
import "./Random.css";

function Random() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);


    const handleButtonClick = async () => {
        try {
            const newRecipes = await fetchData();
            setRecipes(newRecipes);
        } catch (error) {
            setError("An error occurred while fetching recipes. Please try again.");
        }
    };

    return (
        <>
            <button onClick={handleButtonClick}>Click me for some random recipes</button>
            {error && <p className="error-message">{error}</p>}
            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <Card key={recipe.uri || index} recipe={recipe}/>
                ))}
            </div>
            <p>Laat je verassen door random opties.</p>
        </>
    );
}

export default Random;