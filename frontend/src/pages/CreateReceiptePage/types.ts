import type { Unit } from "../../components/organisms/Select/types.ts";

export type RecipeIngredientDTO = {
    ingredientId: string;
    name: string;
    quantity: number; // backend Integer
    unit: Unit;
    isAnimal: boolean;
};

export type RecipeItemType = {
    id: string,
    name: string,
    image: string,
    timeMinutes: number,
    ingredients: RecipeIngredientDTO[],
    instructions: string
}