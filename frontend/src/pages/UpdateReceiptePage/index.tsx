import {useEffect, useState} from "react";
import Card from "../../components/molecules/Card";
import axios from "axios";
import {BASE_API_URL} from "../../system/api/constants.ts";
import { useParams} from "react-router-dom";
import CreateUpdateRecipeForm from "../../components/organisms/CreateUpdateRecipeForm";
import NotFound from "../NotFound";
import type {RecipeItemType} from "../CreateReceiptePage/types.ts";
import {useApiHelpers} from "../../system/api/helperHooks.ts";

export default function UpdateRecipePage() {
    const [recipe, setRecipe] = useState<RecipeItemType | null>(null)
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const { onUpdate } = useApiHelpers(setLoading)
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        axios.get(`${BASE_API_URL}/${id}`)
            .then(result => {
                setRecipe(result.data)
            })
            .catch(error => {
                if(error.response.status === 404) {
                    setNotFound(true);
                }
            })
            .finally(() => setLoading(false))
    }, []);

    const onSubmit = (data: RecipeItemType) => {
        setLoading(true)
        onUpdate(id || data.id, data);
    }

    if (notFound) {
        return <NotFound />;
    }

    return (
        <Card title={"Update Recipe"}>
            <div className={"create-recipe-page"}>
                    <CreateUpdateRecipeForm
                        key={recipe?.id}
                        initialValues={recipe ?? undefined}
                        onSubmit={onSubmit}
                        submitLabel="Update Recipe"
                        loading={loading}
                    />
            </div>
        </Card>

    );
}
