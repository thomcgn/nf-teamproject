import {Link, NavLink} from 'react-router-dom';
import {APP_ROUTES} from "../../../system/router/constants.ts";

export default function Header() {
    return (
        <header className="header">
            <Link to={APP_ROUTES.index} className="header__logo">
                Kitchenly
            </Link>

            <nav className="header__nav">
                <NavLink
                    to={APP_ROUTES.receipts.index}
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Recipes
                </NavLink>
                <NavLink
                    to={APP_ROUTES.ingredients.index}
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Ingredients
                </NavLink>
                <NavLink
                    to={APP_ROUTES.about.index}
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    About
                </NavLink>
            </nav>
        </header>
    );
}
