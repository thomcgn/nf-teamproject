import {useState} from "react";
import Card from "../../components/molecules/Card";
import {useToast} from "../../components/organisms/Toast";
import axios from "axios";
import {BASE_API_URL} from "../../system/api/constants.ts";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../system/router/constants.ts";
import type {RecipeItemType} from "./types.ts";
import CreateUpdateRecipeForm from "../../components/organisms/CreateUpdateRecipeForm";
import Loader from "../../components/atoms/Loader";

export default function CreateRecipePage() {
    const { showToast }  = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onCreate = (data: Omit<RecipeItemType, "id">) => {
        axios.post(BASE_API_URL, data)
            .then(response => {
                const data = response.data;
                showToast({
                    type: "success",
                    message: `Recipe: ${data.name} create sucessfully`
                })
                navigate(APP_ROUTES.receipts.index)
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to create",
                })
            })
            .finally(() => setLoading(false))
    }

    const onSubmit = (data: RecipeItemType) => {
        setLoading(true)
        onCreate(data);
    }

    return (
        <Card title={"Create New Recipe"}>
            <div className={"create-recipe-page"}>
                {
                    loading
                        ? (<Loader />)
                        : (
                            <CreateUpdateRecipeForm
                                onSubmit={onSubmit}
                                submitLabel="Create Recipe"
                            />
                        )
                }

            </div>
        </Card>

    );
}
