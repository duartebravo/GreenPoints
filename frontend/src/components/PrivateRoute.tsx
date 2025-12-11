import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { token, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">A carregar...</p>
                </div>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
