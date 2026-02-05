import {useEffect, useRef, useState} from "react";
import {getFavorites, isFavorite, toggleFavorite} from "../../system/utils";

export const useFlyToFavorites = (id: string) => {
    const [favorite, setFavorite] = useState(() => isFavorite(id));
    const ref = useRef<HTMLButtonElement>(null);

    const toggle = () => {
        toggleFavorite(id);
        setFavorite((p) => !p);

        const star = ref.current;
        const target = document.querySelector(".header__favorites");

        if (star && target) {
            const starRect = star.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            const dest = favorite
                ? { left: starRect.left, top: starRect.top }
                : { left: targetRect.left, top: targetRect.top };

            const start = favorite
                ? { left: targetRect.left, top: targetRect.top }
                : { left: starRect.left, top: starRect.top };

            const clone = star.cloneNode(true) as HTMLElement;
            clone.style.position = "fixed";
            clone.style.left = `${start.left}px`;
            clone.style.top = `${start.top}px`;
            clone.style.zIndex = "9999";
            clone.style.pointerEvents = "none";
            document.body.appendChild(clone);

            requestAnimationFrame(() => {
                clone.style.transition = "all 2s cubic-bezier(0.4, 0, 0.2, 1)";
                clone.style.left = `${dest.left}px`;
                clone.style.top = `${dest.top}px`;
                clone.style.transform = "scale(0.8)";
                clone.style.opacity = "0";
            });

            setTimeout(() => clone.remove(), 3000);
        }
    };

    return { favorite, ref, toggle };
};


export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>(getFavorites());

    useEffect(() => {
        const update = () => setFavorites(getFavorites());

        window.addEventListener("favorites-changed", update);
        return () => window.removeEventListener("favorites-changed", update);
    }, []);

    return { favorites, setFavorites };
}