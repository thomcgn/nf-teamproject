import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/molecules/Card";
import type {RecipeResponse} from "./types.ts";

export default function RecipeDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        axios
            .get<RecipeResponse>(`/api/recipe/${id}`)
            .then((res) => {
                setRecipe(res.data);
                setError(null);
            })
            .catch((e) => {
                if (e.response?.status === 404) setError("Recipe not found.");
                else setError("Could not load recipe.");
                setRecipe(null);
            });
    }, [id]);

    const handleDelete = () => {
        if (!id) return;
        if (!window.confirm("Delete this recipe?")) return;

        axios
            .delete(`/api/recipe/${id}`)
            .then(() => navigate("/recipe"))
            .catch((e) => {
                if (e.response?.status === 401) {
                    alert("Please sign in to delete recipes.");
                    return;
                }
                alert("Delete failed.");
            });
    };

    if (error) {
        return (
            <Card title="Recipe">
                <p>{error}</p>
                <Link to="/recipe" className="btn btn--ghost">← Back</Link>
            </Card>
        );
    }

    if (!recipe) {
        return (
            <Card title="Recipe">
                <p>Loading...</p>
            </Card>
        );
    }

    return (
        <Card title={recipe.name}>
            <div className="details__topbar">
                <Link to="/recipe" className="btn btn--ghost">← Back</Link>
                    <div className="details__actions">
                        {/* If you have an edit page later */}
                        <Link to={`/recipe/${recipe.id}/edit`} className="btn">
                            Edit
                        </Link>

                        <button className="btn btn--danger" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
            </div>

            {recipe.timeMinutes != null && (
                <p className="details__meta">
                    ⏱ {recipe.timeMinutes} min
                </p>
            )}

            {recipe.instructions && (
                <>
                    <h2 className="details__section-title">Description</h2>
                    <p>{recipe.instructions}</p>
                </>
            )}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <>
                    <h2 className="details__section-title">Ingredients</h2>
                    <ul className="details__list">
                        {recipe.ingredients.map((ing) => (
                            <li key={ing.ingredientId}>{ing.name} {ing.quantity} {ing.unit}</li>
                        ))}
                    </ul>
                </>
            )}

            {recipe.instructions && (
                <>
                    <h2 className="details__section-title">Instructions</h2>
                    <p style={{ whiteSpace: "pre-wrap" }}>{recipe.instructions}</p>
                </>
            )}
        </Card>
    );
}
