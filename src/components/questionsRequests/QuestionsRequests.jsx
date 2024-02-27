import { useState } from 'react';
import Card from '../recipeCard/RecipeCard'; // Make sure this path is correct

function RecipeSearchAndDisplay() {
    const [diet, setDiet] = useState('anything');
    const [mealType, setMealType] = useState('anything');
    const [cuisineType, setCuisineType] = useState('maybe');
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async (formDiet, formMealType, formCuisineType) => {
        const apiEndpoint = "https://api.edamam.com/api/recipes/v2";
        let queryParams = `?type=public&app_id=fb6f332d&app_key=d5b495d4b5d23179557addf9f7692086&random=true`;

        if (formDiet !== 'anything') {
            queryParams += `&health=${encodeURIComponent(formDiet)}`;
        }
        if (formMealType !== 'anything') {
            queryParams += `&mealType=${encodeURIComponent(formMealType)}`;
        }
        if (formCuisineType !== 'maybe') {
            queryParams += `&cuisineType=${encodeURIComponent(formCuisineType)}`;
        }

        const requestUrl = `${apiEndpoint}${queryParams}`;

        try {
            const response = await fetch(requestUrl);
            if (response.ok) {
                const jsonResponse = await response.json();
                setRecipes(jsonResponse.hits.map(hit => hit.recipe));
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
        fetchRecipes(diet, mealType, cuisineType);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Find a Recipe</legend>

                    {/* Diet Selection */}
                    <div>
                        <p>Is there a special diet?</p>
                        <label><input type="radio" name="diet" value="vegan" onChange={() => setDiet('vegan')} checked={diet === 'vegan'} /> Vegan</label>
                        <label><input type="radio" name="diet" value="vegetarian" onChange={() => setDiet('vegetarian')} checked={diet === 'vegetarian'} /> Vegetarian</label>
                        <label><input type="radio" name="diet" value="anything" onChange={() => setDiet('anything')} checked={diet === 'anything'} /> Anything</label>
                    </div>

                    {/* Meal Type Selection */}
                    <div>
                        <p>What type of meal are you looking for?</p>
                        <label><input type="radio" name="mealType" value="breakfast" onChange={() => setMealType('breakfast')} checked={mealType === 'breakfast'} /> Breakfast</label>
                        <label><input type="radio" name="mealType" value="lunch" onChange={() => setMealType('lunch')} checked={mealType === 'lunch'} /> Lunch</label>
                        <label><input type="radio" name="mealType" value="dinner" onChange={() => setMealType('dinner')} checked={mealType === 'dinner'} /> Dinner</label>
                        <label><input type="radio" name="mealType" value="snack" onChange={() => setMealType('snack')} checked={mealType === 'snack'} /> Snack</label>
                        <label><input type="radio" name="mealType" value="anything" onChange={() => setMealType('anything')} checked={mealType === 'anything'} /> Anything</label>
                    </div>

                    {/* Cuisine Type Selection */}
                    <div>
                        <p>Which cuisine would you like to try?</p>
                        <label><input type="radio" name="cuisineType" value="italian" onChange={() => setCuisineType('italian')} checked={cuisineType === 'italian'} /> Italian</label>
                        <label><input type="radio" name="cuisineType" value="japanese" onChange={() => setCuisineType('japanese')} checked={cuisineType === 'japanese'} /> Japanese</label>
                        <label><input type="radio" name="cuisineType" value="mexican" onChange={() => setCuisineType('mexican')} checked={cuisineType === 'mexican'} /> Mexican</label>
                        <label><input type="radio" name="cuisineType" value="maybe" onChange={() => setCuisineType('maybe')} checked={cuisineType === 'maybe'} /> Global</label>
                    </div>

                    <button type="submit">Find recipes</button>
                </fieldset>
            </form>

            {/* Rendering the Card component for each recipe */}
            {recipes.length > 0 ? (
                <div className="recipes-container">
                    {recipes.map((recipe, index) => (
                        <Card key={recipe.uri} recipe={{
                            image: recipe.image,
                            name: recipe.label,
                            instructions: recipe.ingredientLines, // this will depend on what the API returns
                            shareLink: recipe.url
                        }} />
                    ))}
                </div>
            ) : (
                <p>Please adjust your search criteria.</p>
            )}
        </div>
    );
}

export default RecipeSearchAndDisplay;
