const ingredients = [
    '🍅', '🥕', '🧄', '🌶️', '🍋', '🥬'
];

export default function FlyingIngredients() {
    return (
        <>
            {ingredients.map((item, index) => (
                <span
                    key={index}
                    className={`ingredient ingredient--${index}`}
                >
                    {item}
                </span>
            ))}
        </>
    );

}

