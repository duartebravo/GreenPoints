export const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5001/api";

export async function api<T = unknown>(path: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options?.headers || {}),
        },
        ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as any).error || "Erro na comunicação com o servidor");
    return data as T;
}
