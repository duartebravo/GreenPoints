import { Home, Trophy, Plus, Target, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: "home", label: "Início", icon: Home, path: "/dashboard" },
        { id: "ranking", label: "Ranking", icon: Trophy, path: "/ranking" },
        { id: "actions", label: "Ações", icon: Plus, path: "/actions" },
        { id: "challenges", label: "Desafios", icon: Target, path: "/challenges" },
        { id: "profile", label: "Perfil", icon: User, path: "/profile" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 shadow-lg z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-around">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = location.pathname === tab.path;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? "fill-emerald-100" : ""}`} />
                            <span className="text-xs font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
