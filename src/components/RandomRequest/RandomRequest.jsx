import axios from "axios";


async function fetchData() {
    const API_URL =
        "https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=fb6f332d&app_key=d5b495d4b5d23179557addf9f7692086&random=true";

    try {
        const response = await axios.get(API_URL);

        const hits = response.data.hits.slice(0, 5);

        const recipes = hits.map((hit, index) => {
            const recipe = hit.recipe;
            const recipeName = recipe.label;
            const recipeImage = recipe.image;
            const cookingInstructions = recipe.ingredientLines;
            const shareLink = recipe.shareAs;


            return {
                recipeNumber: index + 1,
                name: recipeName,
                image: recipeImage,
                instructions: cookingInstructions,
                shareLink: shareLink
            };
        });

        return recipes;


    } catch (error) {

        throw new Error("The page has not been found. We apologize for the inconvenience.");
    }
}

export default fetchData;



