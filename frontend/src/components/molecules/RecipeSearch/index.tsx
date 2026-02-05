import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import type {IngredientOption} from "../../organisms/Select/types.ts";
import {useToast} from "../../organisms/Toast";
import Loader from "../../atoms/Loader";
import type {RecipeFilterDrawerProps} from "./types.ts";

export default function RecipeFilterDrawer({
   open,
   onClose,
   name,
   onNameChange,
   selectedIngredientIds,
   onToggleIngredient,
   onApply,
   onClear,
}: RecipeFilterDrawerProps) {
    const { showToast } = useToast();
    const [ingredients, setIngredients] = useState<IngredientOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!open) return;
        axios
            .get("/api/ingredients")
            .then((res) => {
                setIngredients(res.data || []);
            })
            .catch(() => {
                showToast({
                    type: "error",
                    message: "Failed to load ingredients",
                });
            })
            .finally(() => setLoading(false));
    }, [open]);

    return (
        <>
            <div
                className={`drawer-overlay ${open ? "open" : ""}`}
                onClick={onClose}
            />

            <div className={`filter-drawer ${open ? "open" : ""}`}>
                <div className="drawer__header">
                    <h2>Filters</h2>
                    <Button
                        type="button"
                        className="btn-ghost"
                        text="✕"
                        onClick={onClose}
                    />
                </div>

                <div className="drawer__content">
                    <Input
                        name="search"
                        label="Recipe name"
                        value={name}
                        onChange={onNameChange}
                        placeholder="e.g. pasta"
                    />
                    <h3>Ingredients</h3>
                    <div className="drawer__ingredients">
                        {loading && (
                           <Loader />
                        )}

                        {!loading &&
                            ingredients.map((ing) => (
                                <label
                                    key={ing.id}
                                    className="drawer__ingredient"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedIngredientIds.includes(
                                            ing.id
                                        )}
                                        onChange={() =>
                                            onToggleIngredient(ing.id)
                                        }
                                    />
                                    <span>{ing.name}</span>
                                </label>
                            ))}
                    </div>
                </div>

                <div className="drawer__footer">
                    <Button
                        type="button"
                        className="btn-ghost"
                        text="Clear"
                        onClick={onClear}
                    />
                    <Button
                        type="button"
                        className="btn-primary"
                        text="Apply"
                        onClick={() => {
                            onApply();
                            onClose();
                        }}
                    />
                </div>
            </div>
        </>
    );
}
