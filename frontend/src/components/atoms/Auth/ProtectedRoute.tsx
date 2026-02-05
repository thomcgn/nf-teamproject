import {Navigate, Outlet, type RouteProps} from "react-router-dom";
import type {MeResponse} from "./MeResponse.ts";
import {APP_ROUTES} from "../../../system/router/constants.ts";
import Loader from "../Loader";

type ProtectedRouteProps = RouteProps & {
    user: MeResponse | null;
}

export default function ProtectedRoute(props: Readonly<ProtectedRouteProps>) {
    if (props.user === undefined) {
        return <Loader />
    }

    return (props.user ? <Outlet/> : <Navigate to={APP_ROUTES.index}/>)
}