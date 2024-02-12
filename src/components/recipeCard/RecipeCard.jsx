
import './RecipeCard.css'; // Make sure the path to the CSS file is correct

function Card({ recipe }) { // Changed from 'recipes' to 'recipe'
    return (
        // Removed the map, as we now deal with individual recipe object
        <div className="card"> {/* It's a good practice to give a class name */}
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            {/* We check if instructions are provided as array and join them, else we display a default message */}
            <p>{Array.isArray(recipe.instructions) ? recipe.instructions.join(', ') : "No instructions available."}</p>
            <a href={recipe.shareLink} target="_blank" rel="noopener noreferrer">Link to recipe</a>
        </div>
    );
}

export default Card;
