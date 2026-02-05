export type RecipeFilterDrawerProps = {
    open: boolean;
    onClose: () => void;
    name: string;
    onNameChange: (v: string) => void;
    selectedIngredientIds: string[];
    onToggleIngredient: (id: string) => void;
    onApply: () => void;
    onClear: () => void;
};