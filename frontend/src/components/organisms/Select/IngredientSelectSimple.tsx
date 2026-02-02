import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import type {IngredientOption} from "./types.ts";
import { useToast } from "../Toast";

type IngredientSelectSimpleProps = {
    value: IngredientOption[];
    onChange: (ingredients: IngredientOption[]) => void;
    showSelected?: boolean;
    minChars?: number;
    showAddWhenNotFound?: boolean;
};

export function IngredientSelectSimple({
                                           value,
                                           onChange,
                                           showSelected = true,
                                           minChars = 2,
                                           showAddWhenNotFound = true,
                                       }: IngredientSelectSimpleProps) {

    const [query, setQuery] = useState("");
    const [options, setOptions] = useState<IngredientOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [isAnimalDraft, setIsAnimalDraft] = useState(false);
    const {showToast} = useToast()

    const selectedSet = useMemo(() => new Set(value.map(v => v.id)), [value]);

    const trimmed = query.trim();
    const canSearch = trimmed.length >= minChars;

    useEffect(() => {
        if (!canSearch) {
            setOptions([]);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        axios.get<IngredientOption[]>("/api/ingredients", {params: {q: trimmed}})
            .then(res => {
                const data = res.data ?? [];
                const filtered = data.filter((o) => !selectedSet.has(o.id)).slice(0, 50);
                setOptions(filtered);
            })
            .catch(() => {
                setError("Failed to search ingredients");
            })
            .finally(() => setLoading(false));
    }, [trimmed, canSearch, selectedSet]);

    useEffect(() => {
        setIsAnimalDraft(false);
    }, [trimmed]);

    const addIngredient = (opt: IngredientOption) => {
        if (selectedSet.has(opt.id)) return;
        onChange([...value, opt]);
        setQuery("");
        setOptions([]);
    };

    const removeIngredient = (id: string) => {
        onChange(value.filter(v => v.id !== id));
    };

    const showNotFound =
        showAddWhenNotFound && canSearch && !loading && !error && options.length === 0;

    const createIngredient = async () => {
        setCreating(true);

        try {
            const res = await axios.post<IngredientOption>("/api/ingredients", {
                name: trimmed,
                isAnimal: isAnimalDraft,
            });

            const created = res.data;

            onChange([...value, created]);

            setQuery("");
            setOptions([]);
            setIsAnimalDraft(false);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showToast({
                    type: "error",
                    message: error.response?.data?.errorMessage || "Failed to add ingredient",
                });
            } else {
                showToast({
                    type: "error",
                    message: "Unexpected error occurred",
                });
            }
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="ingredient-picker">
            <label className="ingredient-picker__label">Ingredients</label>
            <div className="ingredient-picker__control">
                <input
                    className="ingredient-picker__input"
                    value={query}
                    onChange={e => setQuery(e.currentTarget.value)}
                    placeholder="Search ingredient…"
                />
            </div>
            {!canSearch && query.trim().length > 0 && (
                <p className="ingredient-picker__hint">Type at least {minChars} characters.</p>
            )}

            {loading && <p className="ingredient-picker__hint">Searching…</p>}
            {error && <p className="ingredient-picker__error">{error}</p>}

            {options.length > 0 && (
                <div className="ingredient-picker__dropdown">
                    {options.map(opt => (
                        <button
                            key={opt.id}
                            type="button"
                            className="ingredient-picker__option"
                            onClick={() => addIngredient(opt)}
                        >
                            <span>{opt.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {showNotFound && (
                <div className="ingredient-picker__not-found">
                    <p className="ingredient-picker__hint">
                        Ingredient not found. Add ingredient?
                    </p>

                    <label className="ingredient-picker__checkbox">
                        <input
                            type="checkbox"
                            checked={isAnimalDraft}
                            onChange={(e) => setIsAnimalDraft(e.currentTarget.checked)}
                        />
                        <span>Contains animal products</span>
                    </label>

                    <button
                        type="button"
                        className="ingredient-picker__add"
                        onClick={createIngredient}
                        disabled={creating}
                    >
                        {creating ? "Adding…" : `Add "${trimmed}"`}
                    </button>
                </div>
            )}

            {showSelected && (
                <ul className="ingredient-picker__list">
                    {value.map(opt => (
                        <li key={opt.id} className="ingredient-picker__chip">
                            <span className="ingredient-picker__chip-text">{opt.name}</span>
                            <button
                                type="button"
                                className="ingredient-picker__chip-remove"
                                onClick={() => removeIngredient(opt.id)}
                                aria-label={`Remove ${opt.name}`}
                            >×
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
