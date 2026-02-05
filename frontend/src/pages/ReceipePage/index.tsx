import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useToast } from "../../components/organisms/Toast";
import type { RecipeItemType } from "../CreateReceiptePage/types";
import RecipeCard from "../../components/molecules/RecipeCard";
import Loader from "../../components/atoms/Loader";
import {BASE_API_URL} from "../../system/api/constants.ts";
import Card from "../../components/molecules/Card";
import type {MeResponse} from "../../components/atoms/Auth/MeResponse.ts";
import Pagination from "../../components/molecules/Pagination";
import {useApiHelpers} from "../../system/api/helperHooks.ts";

export const PAGE_SIZE = 4;

export default function RecipePage({ user }: { user: MeResponse | null}) {
    const { showToast } = useToast();
    const [recipes, setRecipes] = useState<RecipeItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const { onDelete } = useApiHelpers(setLoading);

    useEffect(() => {
        axios
            .get<RecipeItemType[]>(BASE_API_URL)
            .then((res) => setRecipes(res.data))
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.message || "Failed to load recipes",
                });
            })
            .finally(() => setLoading(false));
    }, []);

    const totalPages = Math.ceil(recipes.length / PAGE_SIZE);

    const paginatedRecipes = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return recipes.slice(start, start + PAGE_SIZE);
    }, [recipes, page]);

    return (
        <Card title={"Recipes"}>
                {loading
                    ? (<Loader />)
                    : (
                        <div className="recipes-page">
                            {paginatedRecipes.length === 0 ? (
                                <p>No recipes found.</p>
                            ) : (
                                <div className="recipes-grid">
                                    {paginatedRecipes.map((recipe) => (
                                        <RecipeCard
                                            key={recipe.id}
                                            recipe={recipe}
                                            onDelete={onDelete}
                                            isLoginedUser={!!user}
                                        />
                                    ))}
                                </div>
                            )}
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                onPrev={() => setPage((p) => p - 1)}
                                onNext={() => setPage((p) => p + 1)}
                            />
                        </div>
                    )
                }
        </Card>

    );
}
