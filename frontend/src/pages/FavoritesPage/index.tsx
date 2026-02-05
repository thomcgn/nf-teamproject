import Card from "../../components/molecules/Card";
import RecipeCard from "../../components/molecules/RecipeCard";
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
import RecipeFilterDrawer from "../../components/molecules/RecipeSearch";
import Button from "../../components/atoms/Button";

export default function FavoritesPage({ user }: { user: MeResponse | null}) {
    const { favorites } = useFavorites();
    const [page, setPage] = useState(1);

    const [recipes, setRecipes] = useState<RecipeItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const { onDelete } = useApiHelpers(setLoading);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    const toggleIngredient = (id: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const fetchRecipes = () => {
        axios
            .get(BASE_API_URL, {
                params: {
                    name: searchName || undefined,
                    ingredientIds: selectedIngredients.length
                        ? selectedIngredients
                        : undefined,
                },
            })
            .then((res) => setRecipes(res.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchRecipes();
    }, []);


    const favoriteRecipes = useMemo(() => {
        return recipes.filter((r) => favorites.includes(r.id));
    }, [recipes, favorites]);

    const totalPages = Math.ceil(favoriteRecipes.length / PAGE_SIZE);
    const paginatedFavorites = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return favoriteRecipes.slice(start, start + PAGE_SIZE);
    }, [favoriteRecipes, page]);

    const handleDelete = (id: string) => {
        onDelete(id, () => {
            setRecipes((prev) => prev.filter((r) => r.id !== id));
        });
    };

    return (
        <>
            <Card
                title={favoriteRecipes.length > 0 ? "Your Favorites ⭐" : "No favorites yet"}
                extra={<Button
                    text="Filters"
                    className="btn-primary"
                    onClick={() => setDrawerOpen(true)}
                />
                }
            >
                {loading
                    ? <Loader/>
                    : (
                        <div className="recipes-page">
                            <div className="recipes-grid">
                                {paginatedFavorites.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        onDelete={handleDelete}
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
            <RecipeFilterDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                name={searchName}
                onNameChange={setSearchName}
                selectedIngredientIds={selectedIngredients}
                onToggleIngredient={toggleIngredient}
                onApply={() => {
                    setLoading(true);
                    setPage(1);
                    fetchRecipes()
                }}
                onClear={() => {
                    setSearchName("");
                    setSelectedIngredients([]);
                    fetchRecipes();
                }}
            />
        </>

    );
}
