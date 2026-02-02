export const isValidImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!url) return resolve(false);

        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = url;
    });
};

