import axios from "axios";
import {useEffect} from "react";

export default function LoginButton() {

    function login() {
        const host:string = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "_self");
    }

    const loadUser = () => {
        axios.get("/api/auth/me")
        .then((res) => console.log(res.data))
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
        <button
            className="login-button"
            onClick={login}>Sign in</button>
        </>
    )
}