import {useState} from 'react';
import Card from '../RecipeCard/RecipeCard'; // Make sure this path is correct
import './QuestionsRequests.css';
import Button from "../Button/Button.jsx";
import axios from "axios";
import RadioGroup from "../Radiogroup/Radiogroup.jsx";
import Alert from "../Alert/Alert.jsx"; // Make sure this path is correct


function RecipeSearchAndDisplay() {
    const [diet, setDiet] = useState('anything');
    const [mealType, setMealType] = useState('anything');
    const [cuisineType, setCuisineType] = useState('maybe');
    const [recipes, setRecipes] = useState([]);


    const [isDietSelected, setIsDietSelected] = useState(false);
    const [isMealTypeSelected, setIsMealTypeSelected] = useState(false);
    const [isCuisineTypeSelected, setIsCuisineTypeSelected] = useState(false);


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
            const response = await axios.get(requestUrl);
            setRecipes(response.data.hits.map(hit => hit.recipe));
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
                    <RadioGroup
                        legend="Is there a special diet?"
                        name="diet"
                        options={[
                            { value: 'vegan', label: 'Vegan' },
                            { value: 'vegetarian', label: 'Vegetarian' },
                            { value: 'anything', label: 'Anything' }
                        ]}
                        selectedValue={diet}
                        onChange={value => setDiet(value)}
                    />

                    <RadioGroup
                        legend="What type of meal are you looking for?"
                        name="mealType"
                        options={[
                            { value: 'breakfast', label: 'Breakfast' },
                            { value: 'lunch', label: 'Lunch' },
                            { value: 'dinner', label: 'Dinner' },
                            { value: 'snack', label: 'Snack' },
                            { value: 'anything', label: 'Anything' }
                        ]}
                        selectedValue={mealType}
                        onChange={value => setMealType(value)}
                    />

                    <RadioGroup
                        legend="Which cuisine would you like to try?"
                        name="cuisineType"
                        options={[
                            { value: 'italian', label: 'Italian' },
                            { value: 'japanese', label: 'Japanese' },
                            { value: 'mexican', label: 'Mexican' },
                            { value: 'maybe', label: 'Global' }
                        ]}
                        selectedValue={cuisineType}
                        onChange={value => setCuisineType(value)}
                    />
                    <Button type="submit" text="Find recipes" onClick={handleSubmit}/>

                </fieldset>
            </form>

            {/* Rendering the Card component for each recipe */}
            {recipes.length > 0 ? (
                <div className="recipes-container">
                    {recipes.map((recipe, index) => (
                        <Card key={recipe.uri} recipe={{
                            image: recipe.image,
                            name: recipe.label,
                            instructions: recipe.ingredientLines,
                            shareLink: recipe.url
                        }}/>
                    ))}
                </div>
            ) : null}

            {!((diet === 'anything' && mealType === 'anything' && cuisineType === 'maybe')) ? null : (
                <Alert message="Please adjust your search criteria." type="warning" />
            )}
        </div>



    );

}

export default RecipeSearchAndDisplay;
