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
    isAnimal: boolean;
};

export type RecipeIngredientLine = {
    ingredientId: string;
    name: string;
    isAnimal: boolean;
    quantity: string;
    unit: Unit;
};
