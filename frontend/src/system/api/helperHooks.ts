import {type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import {useToast} from "../../components/organisms/Toast";
import {useNavigate} from "react-router-dom";
import type {RecipeItemType} from "../../pages/CreateReceiptePage/types.ts";
import {BASE_API_URL} from "./constants.ts";
import {APP_ROUTES} from "../router/constants.ts";

export const useApiHelpers = (setLoading: Dispatch<SetStateAction<boolean>>) => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    const onCreate = (data: Omit<RecipeItemType, "id">) => {
        setLoading(true);
        axios
            .post(BASE_API_URL, data)
            .then((res) => {
                showToast({ type: "success", message: `Recipe "${res.data.name}" created successfully` });
                navigate(APP_ROUTES.receipts.index);
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to create recipe",
                });
            })
            .finally(() => setLoading(false));
    };

    const onUpdate = (id: string, data: Omit<RecipeItemType, "id">) => {
        setLoading(true);
        axios
            .put(`${BASE_API_URL}/${id}`, data)
            .then((res) => {
                showToast({ type: "success", message: `Recipe "${res.data.name}" updated successfully` });
                navigate(APP_ROUTES.receipts.index);
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to update recipe",
                });
            })
            .finally(() => setLoading(false));
    };

    const onDelete = (id: string, onSuccess?: () => void) => {
        setLoading(true);
        axios
            .delete(`${BASE_API_URL}/${id}`)
            .then(() => {
                showToast({ type: "success", message: "Recipe deleted" });
                onSuccess?.();
            })
            .catch(() => {
                showToast({ type: "error", message: "Failed to delete recipe" });
            })
            .finally(() => setLoading(false));
    };

    return { onCreate, onUpdate, onDelete };
};
