import { useState } from "react";
import fetchData from "../../components/randomRequest/RandomRequest.jsx";

function Random () {
    const [recipeData, setRecipeData] = useState(null);

    const handleButtonClick = async () => {
        try {
            const data = await fetchData();
            setRecipeData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button onClick={handleButtonClick}>Click me for a random recipe</button>

            {recipeData && (
                <div>
                    <h3>Random Recipe Data:</h3>
                    <pre>{JSON.stringify(recipeData, null, 2)}</pre>
                </div>
            )}

            <p>
                Hier hebben we een random optie die ook zonder inloggen of registreren te zien is
            </p>
        </>
    );
}

export default Random;



