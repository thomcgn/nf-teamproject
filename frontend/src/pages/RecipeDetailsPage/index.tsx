import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Card from "../../components/molecules/Card";
import {formatUnit, type RecipeResponse} from "./types.ts";
import Loader from "../../components/atoms/Loader";
import DeleteRecipeButton from "../../components/atoms/DeleteRecipeButton.tsx";
import {APP_ROUTES} from "../../system/router/constants.ts";
import {BASE_API_URL} from "../../system/api/constants.ts";
import {useToast} from "../../components/organisms/Toast";
import NotFound from "../NotFound";
import {MdOutlineTimer} from "react-icons/md";

export default function RecipeDetailsPage() {
    const {id} = useParams();
    const {showToast} = useToast();
    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        axios
            .get<RecipeResponse>(`${BASE_API_URL}/${id}`)
            .then((res) => {
                setRecipe(res.data);
            })
            .catch((e) => {
                if (e.response?.status === 404) {
                    setNotFound(true);
                } else {
                    showToast({
                        type: "error",
                        message: e?.response?.data?.errorMessage || "Could not load Recipe",
                    });
                }
                setRecipe(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (notFound) {
        return <NotFound/>;
    }

    return (
        <Card title={recipe?.name ?? "Recipe Details"}>
            <div className="recipe-details-page">
                {loading && <Loader/>}

                {!loading && !recipe && (
                    <>
                        <p>Recipe not available.</p>
                        <Link to={APP_ROUTES.receipts.index} className="btn btn--ghost">
                            ←
                        </Link>
                    </>
                )}

                {recipe && (
                    <>
                        <div className="details__topbar">
                            <Link to={APP_ROUTES.receipts.index} className="btn btn--ghost">
                                ←
                            </Link>

                            <div className="details__actions">
                                <DeleteRecipeButton recipeId={recipe.id}
                                                    onDeleted={() => navigate(APP_ROUTES.receipts.index)}/>
                            </div>
                        </div>

                        <div className="image-preview">
                            <img src={recipe.image} alt={recipe.name}/>
                        </div>

                        {recipe.timeMinutes != null && (
                            <p className="details__meta"><MdOutlineTimer/>{recipe.timeMinutes} min</p>
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
                                                <span className="details__list-qty">{qty} {spacer} {unit}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {recipe.instructions?.trim() && (
                            <div className="details__section">
                                <h2 className="details__section-title">Instructions</h2>
                                <p className="details__text" style={{whiteSpace: "pre-wrap"}}>
                                    {recipe.instructions}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Card>
    );


}
