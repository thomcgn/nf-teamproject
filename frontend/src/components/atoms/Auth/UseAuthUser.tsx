import axios from "axios";
import { useEffect, useState } from "react";

type MeResponse = { login: string };

export function useAuthUser(): { user: MeResponse | null } {
    const [user, setUser] = useState<MeResponse | null>(null);

    useEffect(() => {
        axios
            .get<MeResponse>("/api/auth/me")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    return { user };
}
