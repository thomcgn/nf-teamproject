import {type RecipeIngredientType, type Unit, UNIT_OPTIONS} from "../../components/organisms/Select/types.ts";

export type RecipeResponse = {
    id: string;
    name: string;
    instructions: string;
    image: string;
    timeMinutes: number | null;
    ingredients: RecipeIngredientType[];

};


const UNIT_LABEL_MAP: Record<Unit, string> = Object.fromEntries(
    UNIT_OPTIONS.map((o) => [o.value, o.label])
) as Record<Unit, string>;

export function formatUnit(unit: Unit): string {
    return UNIT_LABEL_MAP[unit];
}