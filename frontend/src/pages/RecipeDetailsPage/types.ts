export type Ingredient = {
    ingredientId: string;
    name: string;
    quantity: number;
    unit: string;
    animal: boolean;
};

export type RecipeResponse = {
    id: string;
    name: string;
    instructions: string;
    image: string;
    timeMinutes: number;
    ingredients: Ingredient[];

};