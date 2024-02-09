import { useState } from 'react';
import axios from "axios";

function RecipeSearchAndDisplay() {
    const [diet, setDiet] = useState('anything');
    const [temperature, setTemperature] = useState('anything');
    const [effort, setEffort] = useState('maybe');
    const [recipes, setRecipes] = useState([]);


    const fetchRecipes = async (formDiet, formTemperature, formEffort) => {
        const apiEndpoint = "https://api.edamam.com/api/recipes/v2";
        const queryParams = `?type=public&q=${encodeURIComponent(formDiet)}&q=${formTemperature}&q=${formEffort}&app_id=fb6f332d&app_key=d5b495d4b5d23179557addf9f7692086&random=true`;
        const requestUrl = `${apiEndpoint}${queryParams}`;
      console.log()

        try {
            const response = await fetch(requestUrl);
            if (response.ok) {
                const jsonResponse = await response.json();
                setRecipes(jsonResponse.hits || []);
            } else {
                throw new Error('Error fetching recipes');
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setRecipes([]);
        }
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        fetchRecipes(diet, temperature, effort);
    };

    return (
        <div>
            {/* Questions Form */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Questions for your Yummy dish:</legend>

                    <div>
                        <p>Is there a special diet?</p>
                        <label>
                            <input type="radio" name="diet" value="vegan"
                                   onChange={() => setDiet('vegan')}
                                   checked={diet === 'vegan'}/> Vegan
                        </label>
                        <label>
                            <input type="radio" name="diet" value="vegetarian"
                                   onChange={() => setDiet('vegetarian')}
                                   checked={diet === 'vegetarian'}/> Vegetarian
                        </label>
                        <label>
                            <input type="radio" name="diet" value="anything"
                                   onChange={() => setDiet('anything')}
                                   checked={diet === 'anything'}/> Anything
                        </label>
                    </div>

                    <div>
                        <p>What temperature should the dish be?</p>
                        <label>
                            <input type="radio" name="temperature" value="hot"
                                   onChange={() => setTemperature('hot')}
                                   checked={temperature === 'hot'}/> Hot
                        </label>
                        <label>
                            <input type="radio" name="temperature" value="cold"
                                   onChange={() => setTemperature('cold')}
                                   checked={temperature === 'cold'}/> Cold
                        </label>
                        <label>
                            <input type="radio" name="temperature" value="anything"
                                   onChange={() => setTemperature('anything')}
                                   checked={temperature === 'anything'}/> Anything
                        </label>
                    </div>

                    <div>
                        <p>Do you feel like putting some effort into the dish?</p>
                        <label>
                            <input type="radio" name="effort" value="yes"
                                   onChange={() => setEffort('yes')}
                                   checked={effort === 'yes'}/> Yes
                        </label>
                        <label>
                            <input type="radio" name="effort" value="no"
                                   onChange={() => setEffort('no')}
                                   checked={effort === 'no'}/> No
                        </label>
                        <label>
                            <input type="radio" name="effort" value="maybe"
                                   onChange={() => setEffort('maybe')}
                                   checked={effort === 'maybe'}/> Maybe
                        </label>
                    </div>
                </fieldset>
                <button type="submit">Let's go!</button>
            </form>

            {/* Displaying Recipes */}
            <div>
                {recipes.length > 0 ? (
                    recipes.map((recipeData, index) => (
                        <div key={index}>
                            <h2>{recipeData.recipe.label}</h2>
                            <img src={recipeData.recipe.image} alt={recipeData.recipe.label} />
                            {/* ... other details ... */}
                        </div>
                    ))
                ) : (
                    <p>No recipes to display.</p>
                )}
            </div>
        </div>
    );
}

export default RecipeSearchAndDisplay;

