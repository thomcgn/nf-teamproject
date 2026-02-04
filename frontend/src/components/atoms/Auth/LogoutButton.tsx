import axios from "axios";
import {useEffect, useState} from "react";

type MeResponse = { login: string };

export default function LogoutButton() {
    const [user, setUser] = useState<MeResponse | null>(null);

    const loadUser = () => {
        axios
            .get<MeResponse>("/api/auth/me")
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
            });
    };

    const logout = () => {
        const host:string = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/logout", "_self");
    };

    useEffect(() => {
        loadUser();
    }, []);

    if (!user) return null;

    return (
        <>
            <button
                className="logout-button"
                onClick={logout}>Sign out
            </button>
        </>
    )
}