import type {MainLayoutProps} from "./types.ts";
import Header from "../Header";
import {APP_ROUTES} from "../../../system/router/constants.ts";
import {useLocation} from "react-router-dom";
import FlyingIngredients from "../../atoms/FlyingIngredients";

export default function MainLayout({ children }: MainLayoutProps) {
    const location = useLocation();
    const isStartPage = location.pathname === APP_ROUTES.index;
    return (
        <div className="main-layout">
            <FlyingIngredients />
            {!isStartPage && <Header />}
            <main className="main-layout__container">{children}</main>
        </div>
    );
}