import { createContext } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    points: number;
    badges: string[];
    actionsCount: {
        reciclagem: number;
        energia: number;
        agua: number;
        transporte: number;
        consumo: number;
        comunidade: number;
    };
    createdAt: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
