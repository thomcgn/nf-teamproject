import {Link, NavLink} from 'react-router-dom';
import {APP_ROUTES} from "../../../system/router/constants.ts";
import logo from "../../../assets/logo.svg";
import LogoutButton from "../../atoms/Auth/LogoutButton.tsx";
import {useAuthUser} from "../../atoms/Auth/UseAuthUser.tsx";
import LoginButton from "../../atoms/Auth/LoginButton.tsx";

export default function Header() {
    const { user } = useAuthUser();
    return (
        <header className="header">
            <Link to={APP_ROUTES.index} className="header__logo">
                <img src={logo} alt="Kitchenly" className="logo-svg" />
                <span className="header__logo-text">Kitchenly</span>
            </Link>

            <nav className="header__nav">
                <NavLink
                    to={APP_ROUTES.receipts.index}
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Recipes
                </NavLink>
                { user && <NavLink
                    to={APP_ROUTES.receipts.create}
                    className={({isActive}) => isActive ? 'active' : ''}
                >
                    Add recipes
                </NavLink>}
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
