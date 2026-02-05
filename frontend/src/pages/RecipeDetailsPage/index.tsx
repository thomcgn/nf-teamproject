import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Card from "../../components/molecules/Card";
import {formatUnit, type RecipeResponse} from "./types.ts";
import Loader from "../../components/atoms/Loader";
import {APP_ROUTES} from "../../system/router/constants.ts";
import {BASE_API_URL} from "../../system/api/constants.ts";
import {useToast} from "../../components/organisms/Toast";
import NotFound from "../NotFound";
import {MdOutlineTimer} from "react-icons/md";
import {useApiHelpers} from "../../system/api/helperHooks.ts";
import ModalDelete from "../../components/organisms/ModalDelete";
import {FaTrash} from "react-icons/fa";
import Button from "../../components/atoms/Button";
import {useAuthUser} from "../../components/atoms/Auth/UseAuthUser.tsx";

export default function RecipeDetailsPage() {
    const {id} = useParams();
    const {showToast} = useToast();
    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const { onDelete } = useApiHelpers(setLoading)
    const [notFound, setNotFound] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthUser();

    useEffect(() => {
        if (!id) return;
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
    }, []);

    if (notFound) {
        return <NotFound/>;
    }

    return (
        <Card
            title={recipe?.name ?? "Recipe Details"}
            backButtonTo={APP_ROUTES.receipts.index}
            extra={user && (
                <Button
                    icon={<FaTrash />}
                    className="btn-danger"
                    onlyIcon
                    onClick={() => setModalOpen(true)}
                />
            )
        }
        >
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
                        <div className="details__wide">
                            <div className="details__image">
                                <img src={recipe.image} alt={recipe.name} />
                            </div>

                            {recipe.ingredients?.length > 0 && (
                                <div className="details__ingredients">
                                    <h2>Ingredients</h2>
                                    <ul>
                                        {recipe.ingredients.map((ing) => {
                                            const unit = formatUnit(ing.unit);
                                            const qty = ing.quantity ?? "";
                                            const spacer = qty && unit ? " " : "";
                                            return (
                                                <li key={ing.ingredientId}>
                                                    <span>{ing.name}</span>
                                                    <span>
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
                        </div>

                        {recipe.instructions?.trim() && (
                            <div className="details__instructions">
                                <h2>Instructions</h2>
                                <p style={{ whiteSpace: "pre-wrap" }}>{recipe.instructions}</p>
                            </div>
                        )}

                        {/* TIME META */}
                        {recipe.timeMinutes != null && (
                            <p className="details__meta">
                                <MdOutlineTimer /> {recipe.timeMinutes} min
                            </p>
                        )}
                    </>
                )}
            </div>
            {recipe && (
                <ModalDelete
                    isOpen={modalOpen}
                    itemName={recipe?.name}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => {
                        onDelete(recipe.id, () => navigate(APP_ROUTES.receipts.index));
                        setModalOpen(false);
                    }}
                />
            )}
        </Card>
    );


}
