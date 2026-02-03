import {useEffect, useState} from 'react';
import type {CreateUpdateRecipeFormProps} from "./types.ts";
import Input from "../../atoms/Input";
import {IngredientSelectForRecipe} from "../Select/IngredientSelectForRecipe.tsx";
import Textarea from "../../atoms/TextArea";
import type {RecipeIngredientType} from "../Select/types.ts";
import {isValidImageUrl} from "../../../system/utils/indes.tsx";

export default function CreateUpdateRecipeForm({
   initialValues,
   onSubmit,
   submitLabel,
}: CreateUpdateRecipeFormProps) {
    const [name, setName] = useState(initialValues?.name || "");
    const [timeMinutes, setTimeMinutes] = useState(initialValues?.timeMinutes || 0);
    const [image, setImage] = useState(initialValues?.image || "");
    const [instructions, setInstructions] = useState(initialValues?.instructions || "");
    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredientType[]>(
        initialValues?.ingredients || []
    );
    const [imageValid, setImageValid] = useState(false);

    useEffect(() => {
        isValidImageUrl(image).then((isValid) => {
            setImageValid(isValid);
        });
    }, [image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            id: initialValues?.id || "",
            name: name.trim(),
            timeMinutes,
            image: image.trim(),
            instructions: instructions.trim(),
            ingredients: recipeIngredients,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                name={"name"}
                label={"Recipe Name:"}
                value={name}
                onChange={setName}
                placeholder="e.g. Spaghetti Carbonara"
            />
            <IngredientSelectForRecipe
                value={recipeIngredients}
                onChange={setRecipeIngredients}
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

            <button className="btn btn-primary" type="submit">
                {submitLabel}
            </button>
        </form>
    );
}

