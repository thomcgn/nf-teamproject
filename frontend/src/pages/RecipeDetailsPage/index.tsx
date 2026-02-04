import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/molecules/Card";
import {formatUnit, type RecipeResponse} from "./types.ts";
import Loader from "../../components/atoms/Loader";
import DeleteRecipeButton from "../../components/atoms/DeleteRecipeButton.tsx";
import {APP_ROUTES} from "../../system/router/constants.ts";

export default function RecipeDetailsPage() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        axios
            .get<RecipeResponse>(`/api/recipe/${id}`)
            .then((res) => {
                setRecipe(res.data);
            })
            .catch((e) => {
                if (e.response?.status === 404) setError("Recipe not found.");
                else setError("Could not load recipe.");
                setRecipe(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Card title="Recipe">
                <div className="recipe-details-page">
                    <Loader />
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card title="Recipe">
                <div className="recipe-details-page">
                    <p>{error}</p>
                    <Link to="/recipe" className="btn btn--ghost">
                        ← Back
                    </Link>
                </div>
            </Card>
        );
    }

    if (!recipe) {
        return (
            <Card title="Recipe">
                <div className="recipe-details-page">
                    <p>Recipe not available.</p>
                    <Link to={APP_ROUTES.receipts.index} className="btn btn--ghost">
                        ←
                    </Link>
                </div>
            </Card>
        );
    }

    return (
        <Card title={recipe.name}>
            <div className="recipe-details-page">
                <div className="details__topbar">
                    <Link to={APP_ROUTES.receipts.index} className="btn btn--ghost">
                        ←
                    </Link>

                    <div className="details__actions">
                        <DeleteRecipeButton recipeId={recipe.id}/>
                    </div>
                </div>

                    <div className="image-preview">
                        <img src={recipe.image} alt={recipe.name} />
                    </div>

                {recipe.timeMinutes != null && (
                    <p className="details__meta">⏱ {recipe.timeMinutes} min</p>
                )}

                {recipe.ingredients?.length > 0 && (
                    <div className="details__section">
                        <h2 className="details__section-title">Ingredients</h2>
                        <ul className="details__list">
                            {recipe.ingredients.map((ing) => {
                                const unit = formatUnit(ing.unit);
                                const qty = ing.quantity ?? "";
                                const spacer = qty && unit ? " " : "";
                                return (
                                    <li key={ing.ingredientId} className="details__list-item">
                                        <span className="details__list-name">{ing.name}</span>
                                        <span className="details__list-qty">
                      {qty}
                                            {spacer}
                                            {unit}
                    </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {recipe.instructions?.trim() && (
                    <div className="details__section">
                        <h2 className="details__section-title">Instructions</h2>
                        <p className="details__text" style={{ whiteSpace: "pre-wrap" }}>
                            {recipe.instructions}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
}
