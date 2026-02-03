import {
    type IngredientOption,
    type IngredientSelectForRecipeProps,
    type RecipeIngredientType,
    type Unit,
    UNIT_OPTIONS
} from "./types.ts";
import {IngredientSelectSimple} from "./IngredientSelectSimple.tsx";


export function IngredientSelectForRecipe({ value, onChange }: IngredientSelectForRecipeProps) {

    const baseIngredients: IngredientOption[] = value.map(v => ({
        id: v.ingredientId,
        name: v.name,
        isAnimal: v.isAnimal,
    }));

    const handleBaseChange = (ingredients: IngredientOption[]) => {
        const newLines: RecipeIngredientType[] = ingredients.map(ing => {
            const existing = value.find(v => v.ingredientId === ing.id);
            return existing ?? {
                ingredientId: ing.id,
                name: ing.name,
                isAnimal: ing.isAnimal ?? false,
                quantity: 0,
                unit: "G",
            };
        });

        onChange(newLines);
    };

    const updateQuantity = (id: string, qtyRaw: string) => {
        const qty = qtyRaw.trim();
        if (qty !== "" && !/^\d+$/.test(qty)) return;

        onChange(value.map(v =>
            v.ingredientId === id ? { ...v, quantity: Number(qty) } : v
        ));
    };

    const updateUnit = (id: string, unit: Unit) => {
        onChange(value.map(v =>
            v.ingredientId === id ? { ...v, unit } : v
        ));
    };

    const removeLine = (id: string) => {
        onChange(value.filter((v) => v.ingredientId !== id));
    };

    return (
        <div className="ingredient-picker">
            <IngredientSelectSimple
               showSelected = {false}
                value={baseIngredients}
                onChange={handleBaseChange}
            />

            <ul className="ingredient-picker__list flex-column">
                {value.map(line => (
                    <li key={line.ingredientId} className="ingredient-picker__row">
                        <span className="ingredient-picker__name">{line.name}</span>

                        <input
                            className="ingredient-picker__qty"
                            inputMode="numeric"
                            placeholder="Qty"
                            value={line.quantity}
                            onChange={e => updateQuantity(line.ingredientId, e.currentTarget.value)}
                        />

                        <select
                            className="ingredient-picker__unit"
                            value={line.unit}
                            onChange={e => updateUnit(line.ingredientId, e.currentTarget.value as Unit)}
                        >
                            {UNIT_OPTIONS.map(u => (
                                <option key={u.value} value={u.value}>
                                    {u.label}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="ingredient-picker__chip-remove"
                            onClick={() => removeLine(line.ingredientId)}
                            aria-label={`Remove ${line.name}`}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
