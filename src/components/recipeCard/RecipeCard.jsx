import  './RecipeCard.css' ;
    '';

function Card({ recipes }) {
    return (
        <div>
            {recipes.map((recipe, index) => (
                <div key={index}>
                    <img src={recipe.image} alt={recipe.name} />
                    <h2>{recipe.name}</h2>
                    <p>{recipe.instructions.join(', ')}</p>
                </div>
            ))}
        </div>
    );
}

export default Card;