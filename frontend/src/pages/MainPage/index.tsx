import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../system/router/constants.ts";

export default function MainPage() {
    const navigate = useNavigate();

    const navigateToReceiptsPage = () => {
        navigate(APP_ROUTES.receipts.index)
    }

    return (
        <main className="main">
            <div className="main__card">
                <h1 className="main__app-name">Kitchenly</h1>

                <h1 className="main__title">
                    Cook smarter.<br />Eat better.
                </h1>

                <p className="main__subtitle">
                    Discover recipes tailored to your taste —
                    fresh ingredients, clear steps, zero stress.
                </p>

                <button
                    type={"button"}
                    className="main__button"
                    onClick={navigateToReceiptsPage}
                >
                    Get Started
                </button>

                <p className="main__hint">
                    No account needed · Free to use
                </p>
            </div>
        </main>
    );
}
