import  './RecipeCard.css' ;


function Card({ recipes }) {
    return (
        <div>
            {recipes.map((recipe, index) => (
                <div key={index}>
                    <img src={recipe.image} alt={recipe.name} />
                    <h2>{recipe.name}</h2>
                    <p>{recipe.instructions.join(', ')}</p>
                    <a href={recipe.shareLink}  target="_blank">Link to recipe</a>
                </div>
            ))}
        </div>
    );
}

export default Card;