export type UnitDto = string | { display?: string } | null | undefined;

export type Ingredient = {
    ingredientId: string;
    name: string;
    quantity: number | null;
    unit: UnitDto;
    animal: boolean;
};

export type RecipeResponse = {
    id: string;
    name: string;
    instructions: string;
    image: string;
    timeMinutes: number | null;
    ingredients: Ingredient[];

};

const UNIT_DISPLAY_MAP: Record<string, string> = {
    G: "g",
    KG: "kg",
    ML: "ml",
    L: "l",
    TSP: "tsp",
    TBSP: "tbsp",
    CUP: "cup",
    PIECE: "piece",
    PINCH: "pinch",
    SLICE: "slice",
    CLOVE: "clove",
    TO_TASTE: "to taste",
    AS_NEEDED: "as needed",
};

export function formatUnit(unit: UnitDto): string {
    if (!unit) return "";
    if (typeof unit === "string") return UNIT_DISPLAY_MAP[unit] ?? unit.toLowerCase();
    return unit.display ?? "";
}