export const isValidImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!url) return resolve(false);

        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = url;
    });
};

const STORAGE_KEY = "favorite-recipes";

export const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const isFavorite = (id: string): boolean => {
    return getFavorites().includes(id);
};

export const toggleFavorite = (id: string): string[] => {
    const favorites = getFavorites();

    const updated = favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(new Event("favorites-changed"));
    return updated;
};

export const removeFavorite = (id: string): string[] => {
    const favorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];

    const updated = favorites.filter((f) => f !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Trigger event so UI can update
    window.dispatchEvent(new Event("favorites-changed"));

    return updated;
};

