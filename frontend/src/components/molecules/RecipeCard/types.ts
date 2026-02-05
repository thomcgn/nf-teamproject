import type {RecipeItemType} from "../../../pages/CreateReceiptePage/types.ts";

export type RecipeCardProps = {
    recipe: RecipeItemType;
    onDelete: (id: string) => void;
    isLoginedUser: boolean
};