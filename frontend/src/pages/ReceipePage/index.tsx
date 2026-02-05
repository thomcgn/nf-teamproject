import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { RecipeItemType } from "../CreateReceiptePage/types";
import RecipeCard from "../../components/molecules/RecipeCard";
import Loader from "../../components/atoms/Loader";
import {BASE_API_URL} from "../../system/api/constants.ts";
import Card from "../../components/molecules/Card";
import type {MeResponse} from "../../components/atoms/Auth/MeResponse.ts";
import Pagination from "../../components/molecules/Pagination";
import {useApiHelpers} from "../../system/api/helperHooks.ts";
import RecipeFilterDrawer from "../../components/molecules/RecipeSearch";
import Button from "../../components/atoms/Button";

export const PAGE_SIZE = 4;

export default function RecipePage({ user }: { user: MeResponse | null}) {
    const [recipes, setRecipes] = useState<RecipeItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
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

    const totalPages = Math.ceil(recipes.length / PAGE_SIZE);

    const paginatedRecipes = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return recipes.slice(start, start + PAGE_SIZE);
    }, [recipes, page]);

    const handleDelete = (id: string) => {
        onDelete(id, () => {
            setRecipes((prev) => prev.filter((r) => r.id !== id));
        });
    };

    return (
        <>
        <Card
            title={"Recipes"}
            extra={<Button
                text="Filters"
                className="btn-primary"
                onClick={() => setDrawerOpen(true)}
            />
        }>
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
                                            onDelete={handleDelete}
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
