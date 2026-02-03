import {useEffect, useState} from "react";
import Card from "../../components/molecules/Card";
import {useToast} from "../../components/organisms/Toast";
import axios from "axios";
import {BASE_API_URL} from "../../system/api/constants.ts";
import {useNavigate, useParams} from "react-router-dom";
import {APP_ROUTES} from "../../system/router/constants.ts";
import CreateUpdateRecipeForm from "../../components/organisms/CreateUpdateRecipeForm";
import NotFound from "../NotFound";
import Loader from "../../components/atoms/Loader";
import type {RecipeItemType} from "../CreateReceiptePage/types.ts";

export default function UpdateRecipePage() {
    const { showToast }  = useToast();
    const [recipe, setRecipe] = useState<RecipeItemType | null>(null)
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
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

    const onUpdate = (data: Omit<RecipeItemType, "id">) => {
        setLoading(true);

        axios.put(`${BASE_API_URL}/${id}`, data)
            .then(response => {
                const data = response.data;
                showToast({
                    type: "success",
                    message: `Recipe: ${data.name} update sucessfully`
                })
                navigate(APP_ROUTES.receipts.index)
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to update",
                })
            })
            .finally(() => setLoading(false))
    }

    const onSubmit = (data: RecipeItemType) => {
        setLoading(true)
        onUpdate(data);
    }

    if (notFound) {
        return <NotFound />;
    }


    return (
        <Card title={"Update Recipe"}>
            <div className={"create-recipe-page"}>
                {loading
                    ? (<Loader />)
                    : recipe && (
                        <CreateUpdateRecipeForm
                            initialValues={recipe}
                            onSubmit={onSubmit}
                            submitLabel="Update Recipe"
                        />
                )}
            </div>
        </Card>

    );
}
