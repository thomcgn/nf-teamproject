import {useFlyToFavorites} from "../../../pages/FavoritesPage/hooks.ts";
import Button from "../../atoms/Button";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import {generatePath, useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../../system/router/constants.ts";
import type {RecipeCardProps} from "./types.ts";
import {useState} from "react";
import ModalDelete from "../../organisms/ModalDelete";

export default function RecipeCard({ recipe, onDelete, isLoginedUser }: RecipeCardProps) {
    const navigate = useNavigate();
    const { favorite, ref, toggle } = useFlyToFavorites(recipe.id);
    const [modalOpen, setModalOpen] = useState(false);

    const onEdit = () => {
        const link = generatePath(APP_ROUTES.receipts.update, { id: recipe.id})
        navigate(link)
    }

    const onReadMore = () => {
        const link = generatePath(APP_ROUTES.receipts.details, { id: recipe.id})
        navigate(link)
    }

    return (
        <article className="recipe-card">
            <div className="recipe-card__image">
                {recipe.image && <img src={recipe.image} alt={recipe.name} />}

                {isLoginedUser && (
                    <button
                        ref={ref}
                        className={`favorite ${favorite ? "active" : ""}`}
                        onClick={toggle}
                    >
                    ⭐
                    </button>
                )}
            </div>

            <div className="recipe-card__body">
                <header>
                    <h3>{recipe.name}</h3>
                    <span>{recipe.timeMinutes} min</span>
                </header>

                {recipe.ingredients.length > 0 && (
                    <ul className="ingredients-preview">
                        {recipe.ingredients.slice(0, 3).map((i) => (
                            <li key={i.ingredientId}>
                                {i.quantity}
                                {i.unit} {i.name}
                            </li>
                        ))}
                        {recipe.ingredients.length > 3 && <li>+ more</li>}
                    </ul>
                )}

                <p className="instructions-preview">
                    {recipe.instructions}
                </p>


                    <div className="recipe-card__actions">
                        <Button
                            icon={<FaEye />}
                            text="Read More"
                            className="btn-outline"
                            onClick={onReadMore}
                        />
                        {isLoginedUser && (
                            <div className="admin-actions">
                                <Button
                                    icon={<FaEdit />}
                                    text="Edit"
                                    className="btn-secondary"
                                    onClick={onEdit}
                                />
                                <Button
                                    icon={<FaTrash />}
                                    className="btn-danger"
                                    onlyIcon
                                    onClick={() => setModalOpen(true)}
                                />
                            </div>
                        )}
                    </div>

            </div>
            <ModalDelete
                isOpen={modalOpen}
                itemName={recipe?.name}
                onClose={() => setModalOpen(false)}
                onConfirm={() => {
                    onDelete(recipe.id);
                    setModalOpen(false);
                }}
            />
        </article>
    );
}
