import {useState} from "react";
import Card from "../../components/molecules/Card";
import type {RecipeItemType} from "./types.ts";
import CreateUpdateRecipeForm from "../../components/organisms/CreateUpdateRecipeForm";
import {useApiHelpers} from "../../system/api/helperHooks.ts";

export default function CreateRecipePage() {
    const [loading, setLoading] = useState(false);
    const { onCreate } = useApiHelpers(setLoading);

    const onSubmit = (data: RecipeItemType) => {
        onCreate(data);
    }
    return (
        <Card title={"Create New Recipe"}>
            <div className={"create-recipe-page"}>
                <CreateUpdateRecipeForm
                    onSubmit={onSubmit}
                    submitLabel="Create Recipe"
                    loading={loading}
                />
            </div>
        </Card>

    );
}
