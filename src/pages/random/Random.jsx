import {useState} from "react";
import fetchData from "../../components/RandomRequest/RandomRequest";
import Card from "../../components/RecipeCard/RecipeCard.jsx";
import "./Random.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

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
            <Header title="Random recipes" />
            <main>
            <div className="random-container">
            <button type="button" onClick={handleButtonClick}>Click me for some random recipes</button>
            {error && <p className="error-message">{error}</p>}
            </div>
            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <Card key={recipe.uri || index} recipe={recipe}/>
                ))}
            </div>

        </main>


            <Footer content="© 2024 Yummy Now" useCodeWrapper={true} />
        </>
    );
}

export default Random;