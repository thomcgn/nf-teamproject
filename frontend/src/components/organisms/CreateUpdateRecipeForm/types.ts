import type {RecipeItemType} from "../../../pages/CreateReceiptePage/types.ts";

export type CreateUpdateRecipeFormProps = {
    initialValues?: RecipeItemType;
    onSubmit: (values: RecipeItemType) => void;
    submitLabel: string;
    loading?: boolean;
};