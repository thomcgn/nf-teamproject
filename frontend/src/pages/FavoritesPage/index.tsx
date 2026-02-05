import Card from "../../components/molecules/Card";
import RecipeCard from "../../components/molecules/RecipeCard";
import {useToast} from "../../components/organisms/Toast";
import {useEffect, useMemo, useState} from "react";
import type {RecipeItemType} from "../CreateReceiptePage/types.ts";
import axios from "axios";
import {BASE_API_URL} from "../../system/api/constants.ts";
import type {MeResponse} from "../../components/atoms/Auth/MeResponse.ts";
import Loader from "../../components/atoms/Loader";
import {useFavorites} from "./hooks.ts";
import {useApiHelpers} from "../../system/api/helperHooks.ts";
import Pagination from "../../components/molecules/Pagination";
import {PAGE_SIZE} from "../ReceipePage";

export default function FavoritesPage({ user }: { user: MeResponse | null}) {
    const { showToast } = useToast();
    const { favorites } = useFavorites();
    const [page, setPage] = useState(1);

    const [recipes, setRecipes] = useState<RecipeItemType[]>([]);
    const [loading, setLoading] = useState(true);
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


    const favoriteRecipes = useMemo(() => {
        return recipes.filter((r) => favorites.includes(r.id));
    }, [recipes, favorites]);

    const totalPages = Math.ceil(favoriteRecipes.length / PAGE_SIZE);
    const paginatedFavorites = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return favoriteRecipes.slice(start, start + PAGE_SIZE);
    }, [favoriteRecipes, page]);

    return (
        <Card title={favoriteRecipes.length > 0 ? "Your Favorites ⭐" : "No favorites yet"}>
            {loading
                ? <Loader/>
                : (
                    <div className="recipes-page">
                        <div className="recipes-grid">
                            {paginatedFavorites.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onDelete={onDelete}
                                    isLoginedUser={!!user}
                                />
                            ))}
                        </div>
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
