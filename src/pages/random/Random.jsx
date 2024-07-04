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
            <header>
                <h1>Random Recipes</h1>
            </header>
            <main>
            <div className="random-container">
            <p>Click the button below to get some random recipes!</p>
            <button type="button" onClick={handleButtonClick}>Click me for some random recipes</button>
            {error && <p className="error-message">{error}</p>}
            </div>
            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <Card key={recipe.uri || index} recipe={recipe}/>
                ))}
            </div>

        </main>

            <footer>
                <code>
                <p>&copy; 2024 Yummy Now. All rights reserved.</p>
                </code>
            </footer>
        </>
    );
}

export default Random;