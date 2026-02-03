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
        axios
            .post("/api/auth/logout")
            .then(() => {
                setUser(null);
                window.location.href = "/";
            });
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