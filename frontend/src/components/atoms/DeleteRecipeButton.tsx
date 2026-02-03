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

    const handleDelete =  () => {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (!confirmed) return;

        axios
            .delete(`${BASE_API_URL}/${recipeId}`)
            .then(() => {
                showToast({
                    type: "success",
                    message: "Recipe deleted successfully",
                });
                onDeleted?.();
            })
            .catch((error) => {
                showToast({
                    type: "error",
                    message: axios.isAxiosError(error)
                        ? error.response?.data?.errorMessage || "Failed to delete recipe"
                        : "Unexpected error occurred",
                });
            });
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
