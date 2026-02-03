const items = ['🧁', '🥗', '🍜', '🍱', '🍔', '🍖'];

export default function Loader() {
    return (
        <div className="loader">
            {items.map((item, index) => (
                <span
                    key={index}
                    className="loader__item"
                    style={{ "--i": index } as React.CSSProperties}
                >
          {item}
        </span>
            ))}
        </div>
    );
}