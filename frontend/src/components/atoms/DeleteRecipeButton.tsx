import axios from "axios";
import {useToast} from "../organisms/Toast";
import {BASE_API_URL} from "../../system/api/constants";
import {IoTrashBinOutline} from "react-icons/io5";

type DeleteRecipeButtonProps = {
    recipeId: string;
    onDeleted?: () => void;
};

export default function DeleteRecipeButton({
                                               recipeId,
                                               onDeleted,
                                           }: DeleteRecipeButtonProps) {
    const {showToast} = useToast();

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (!confirmed) return;

        try {
            await axios.delete(`${BASE_API_URL}/${recipeId}`);

            showToast({
                type: "success",
                message: "Recipe deleted successfully",
            });
            onDeleted?.();

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showToast({
                    type: "error",
                    message: error.response?.data?.errorMessage || "Failed to delete recipe",
                });
            } else {
                showToast({
                    type: "error",
                    message: "Unexpected error occurred",
                })
            }
        }

    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger"
            aria-label="Delete recipe"
        >
            <IoTrashBinOutline/>
        </button>
    );
}
