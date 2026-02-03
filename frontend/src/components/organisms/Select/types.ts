export const UNIT_OPTIONS = [
    { value: "G", label: "g" },
    { value: "KG", label: "kg" },
    { value: "ML", label: "ml" },
    { value: "L", label: "l" },
    { value: "TSP", label: "tsp" },
    { value: "TBSP", label: "tbsp" },
    { value: "CUP", label: "cup" },
    { value: "PIECE", label: "piece" },
    { value: "PINCH", label: "pinch" },
    { value: "SLICE", label: "slice" },
    { value: "CLOVE", label: "clove" },
] as const;

export type Unit = typeof UNIT_OPTIONS[number]["value"];

export type IngredientOption = {
    id: string;
    name: string;
    animal: boolean;
};

export type RecipeIngredientType = {
    ingredientId: string;
    name: string;
    animal: boolean;
    quantity: number;
    unit: Unit;
};

export type IngredientSelectForRecipeProps = {
    value: RecipeIngredientType[];
    onChange: (lines: RecipeIngredientType[]) => void;
};
