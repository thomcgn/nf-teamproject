import {Link, NavLink} from 'react-router-dom';
import {APP_ROUTES} from "../../../system/router/constants.ts";
import logo from "../../../assets/logo.svg";
import LogoutButton from "../../atoms/Auth/LogoutButton.tsx";
import LoginButton from "../../atoms/Auth/LoginButton.tsx";
import {useAuthUser} from "../../atoms/Auth/UseAuthUser.tsx";
import {useFavorites} from "../../../pages/FavoritesPage/hooks.ts";

export default function Header() {
    const { user } = useAuthUser();
    const { favorites } = useFavorites();

    return (
        <header className="header">
            <Link to={APP_ROUTES.index} className="header__logo">
                <img src={logo} alt="Kitchenly" className="logo-svg" />
                <span className="header__logo-text">Kitchenly</span>
            </Link>

            <nav className="header__nav">
                <NavLink
                    to={APP_ROUTES.receipts.index}
                    end
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Recipes
                </NavLink>
                {user && (
                    <>
                        <NavLink
                            to={APP_ROUTES.favorites.index}
                            className={({isActive}) => isActive ? 'active header__favorites' : 'header__favorites'}
                        >
                            Favorites
                            {favorites.length > 0 && (
                                <span className="favorites-star">
                                ⭐ {favorites.length}
                            </span>
                            )}
                        </NavLink>
                        <NavLink
                            to={APP_ROUTES.receipts.create}
                            className={({isActive}) => isActive ? 'active' : ''}
                        >
                            Add recipes
                        </NavLink></>
                )}
                <NavLink
                    to={APP_ROUTES.about.index}
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    About
                </NavLink>
                { user ? (
                    <LogoutButton/>
                ) : (
                    <LoginButton/>
                )}

            </nav>
        </header>
    );
}
