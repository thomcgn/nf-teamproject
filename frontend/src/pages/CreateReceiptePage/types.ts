import type {RecipeIngredientType} from "../../components/organisms/Select/types.ts";

export type RecipeItemType = {
    id: string,
    name: string,
    image: string,
    timeMinutes: number,
    ingredients: RecipeIngredientType[],
    instructions: string
}