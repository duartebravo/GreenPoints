import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import { api } from "@/lib/api";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // Buscar dados do utilizador quando houver token
    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const userData = await api<User>("/auth/me");
                setUser(userData);
            } catch (error) {
                console.error("Erro ao carregar utilizador:", error);
                // Token inválido ou expirado
                localStorage.removeItem("token");
                setToken(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [token]);

    async function login(email: string, password: string) {
        const data = await api<{ token: string }>("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        localStorage.setItem("token", data.token);
        setToken(data.token);
    }

    async function register(name: string, email: string, password: string) {
        await api("/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        });
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    async function refreshUser() {
        if (!token) return;

        try {
            const userData = await api<User>("/auth/me");
            setUser(userData);
        } catch (error) {
            console.error("Erro ao atualizar utilizador:", error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
