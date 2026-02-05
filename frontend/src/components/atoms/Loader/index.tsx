const items = ['🧁', '🥗', '🍜', '🍱', '🍔', '🍖'];

type LoaderProps = {
    overlay?: boolean; // new prop
};

export default function Loader({ overlay = false }: LoaderProps) {
    return (
        <div className={overlay ? "loader loader-overlay" : "loader"}>
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