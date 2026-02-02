import {type FormEvent, useEffect, useState} from "react";
import Card from "../../components/molecules/Card";
import {useToast} from "../../components/organisms/Toast";
import axios from "axios";
import {BASE_API_URL} from "../../system/api/constants.ts";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../system/router/constants.ts";
import Input from "../../components/atoms/Input";
import type {RecipeItemType} from "./types.ts";
import {isValidImageUrl} from "../../system/utils/indes.tsx";
import Textarea from "../../components/atoms/TextArea";

export default function CreateRecipePage() {
    const { showToast }  = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageValid, setImageValid] = useState(false);

    const [name, setName] = useState("");
    const [timeMinutes, setTimeMinutes] = useState(0);
    const [image, setImage] = useState("");
    const [instructions, setInstructions] = useState("");

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();
        const dataToSubmit: Omit<RecipeItemType, "id"> = {
            name,
            instructions,
            image,
            timeMinutes,
            ingredients: []
        }
        onCreate(dataToSubmit)
    };

    useEffect(() => {
        isValidImageUrl(image).then((isValid) => {
            setImageValid(isValid);
        });
    }, [image]);

    return (
        <Card title={"Create New Recipe"}>
            <div className={"create-recipe-page"}>

                <form onSubmit={handleSubmit}>

                    <Input
                        name={"name"}
                        label={"Recipe Name:"}
                        value={name}
                        onChange={setName}
                        placeholder="e.g. Spaghetti Carbonara"
                    />
                    <Input
                        label={"Time (min):"}
                        type={"number"}
                        name={"timeMinutes"}
                        value={timeMinutes}
                        onChange={(value: string) => setTimeMinutes(Number(value))}
                    />
                    <Input
                        label={"Image Url:"}
                        name={"image"}
                        value={image}
                        placeholder="https://..."
                        onChange={setImage}
                    />
                    {imageValid && (
                        <div className="image-preview">
                            <img src={image} alt="Recipe preview" />
                        </div>
                    )}

                    <Textarea
                        name="instructions"
                        label="Instructions"
                        value={instructions}
                        onChange={setInstructions}
                        placeholder="Step by step instructions..."
                    />

                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Recipe"}
                    </button>
                </form>
            </div>
        </Card>

    );
}
