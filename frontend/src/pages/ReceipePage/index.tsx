import { useEffect, useState } from "react";


interface RecipeIngredient {
    ingredientId: string;
    name: string;
    quantity: number;
    unit: string;
    isAnimal: boolean;
}


interface Recipe {
    id: string;
    name: string;
    instructions: string;
    image: string;
    timeMinutes: number;
    ingredients: RecipeIngredient[];
}

export default function RecipePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        fetch("http://localhost:8080/api/recipe")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch recipes");
                return res.json();
            })
            .then((data:Recipe[]) => {
                setRecipes(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="recipe">
            <h1>Recipes</h1>
            {recipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="recipe-card">
                            <h2>{recipe.name}</h2>
                            {recipe.image && (
                                <img
                                    src={recipe.image}
                                    alt={recipe.name}
                                    style={{ width: 200, borderRadius: 8 }}
                                />
                            )}
                            <p><strong>Time:</strong> {recipe.timeMinutes} minutes</p>

                            <h3>Ingredients:</h3>
                            <ul>
                                {recipe.ingredients.map((ingredient, idx) => (
                                    <li key={idx}>
                                        {ingredient.quantity} {ingredient.name}
                                    </li>
                                ))}
                            </ul>

                            <h3>Instructions:</h3>
                            <p>{recipe.instructions}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}
