import { useState } from "react";
import { X, Recycle, Zap, Droplet, Bus, Coffee, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";

// Dados mockados - futuramente virão da API
const categories = [
    { id: "recycle", name: "Reciclagem", icon: Recycle, color: "bg-blue-500", actions: 4 },
    { id: "energy", name: "Energia", icon: Zap, color: "bg-yellow-500", actions: 3 },
    { id: "water", name: "Água", icon: Droplet, color: "bg-cyan-500", actions: 2 },
    { id: "transport", name: "Transporte", icon: Bus, color: "bg-green-500", actions: 4 },
    { id: "consumption", name: "Consumo", icon: Coffee, color: "bg-orange-500", actions: 3 },
    { id: "community", name: "Comunidade", icon: Users, color: "bg-purple-500", actions: 3 },
];

const actionsByCategory: Record<string, { name: string; points: number }[]> = {
    recycle: [
        { name: "Reciclar papel", points: 20 },
        { name: "Reciclar plástico", points: 25 },
        { name: "Reciclar vidro", points: 30 },
        { name: "Reciclar metal", points: 30 },
    ],
    energy: [
        { name: "Desligar luzes", points: 15 },
        { name: "Modo suspensão PC", points: 10 },
        { name: "Usar luz natural", points: 20 },
    ],
    water: [
        { name: "Fechar torneira", points: 15 },
        { name: "Reduzir tempo de banho", points: 25 },
    ],
    transport: [
        { name: "Usar transporte público", points: 30 },
        { name: "Vir de bicicleta", points: 35 },
        { name: "Vir a pé", points: 25 },
        { name: "Partilhar boleia", points: 20 },
    ],
    consumption: [
        { name: "Trazer garrafa reutilizável", points: 20 },
        { name: "Usar caneca própria", points: 15 },
        { name: "Evitar descartáveis", points: 25 },
    ],
    community: [
        { name: "Partilhar dica sustentável", points: 10 },
        { name: "Organizar evento eco", points: 50 },
        { name: "Ajudar colega", points: 15 },
    ],
};

const todayActions = [
    { name: "Reciclei papel", points: 50, time: "Ontem às 14:30" },
    { name: "Usei transporte público", points: 30, time: "Ontem às 09:15" },
    { name: "Trouxe garrafa reutilizável", points: 20, time: "Há 2 dias" },
];

export default function Actions() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    // Stats mockados - futuramente virão da API
    const todayPoints = 150;
    const todayActionsCount = 5;

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setShowPopup(true);
    };

    const handleActionSelect = (action: { name: string; points: number }) => {
        // Aqui seria registada a ação na API
        console.log("Ação selecionada:", action);
        // TODO: await api("/actions", { method: "POST", body: JSON.stringify({ action }) })
        // TODO: refreshUser() para atualizar pontos
        setShowPopup(false);
        setSelectedCategory(null);
    };

    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20 relative">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8 text-white">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-1">Registar Ações</h2>
                    <p className="text-white/90 text-sm sm:text-base">Conte-nos as suas ações sustentáveis</p>
                </div>

                <div className="p-4 sm:p-6 md:p-8 space-y-6">
                    {/* Today Stats */}
                    <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md">
                        <CardContent className="p-4 sm:p-5">
                            <h3 className="text-slate-600 text-sm font-semibold mb-3">Hoje</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-2xl sm:text-3xl font-bold text-emerald-700">
                                        +{todayPoints}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-600">pontos ganhos</p>
                                </div>
                                <div>
                                    <p className="text-2xl sm:text-3xl font-bold text-blue-700">
                                        {todayActionsCount}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-600">ações registadas</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Categories */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
                            Escolha uma categoria
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            {categories.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md transition-all text-center"
                                    >
                                        <div
                                            className={`w-12 h-12 sm:w-14 sm:h-14 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md`}
                                        >
                                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                        </div>
                                        <p className="text-sm sm:text-base font-medium text-slate-900 mb-0.5">
                                            {category.name}
                                        </p>
                                        <p className="text-xs text-slate-500">{category.actions} ações</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* History */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
                            Histórico de Hoje
                        </h3>

                        <div className="space-y-2 sm:space-y-3">
                            {todayActions.map((action, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm sm:text-base font-medium text-slate-900 truncate">
                                            {action.name}
                                        </p>
                                        <p className="text-xs text-slate-500">{action.time}</p>
                                    </div>
                                    <span className="text-sm sm:text-base font-semibold text-emerald-600 ml-3 flex-shrink-0">
                                        +{action.points} pontos
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup/Modal */}
            {showPopup && selectedCategory && (
                <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center sm:justify-center z-50 animate-in fade-in">
                    <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl p-6 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                                {categories.find((c) => c.id === selectedCategory)?.name}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowPopup(false);
                                    setSelectedCategory(null);
                                }}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>

                        <div className="space-y-2 max-h-[60vh] sm:max-h-[400px] overflow-y-auto">
                            {actionsByCategory[selectedCategory]?.map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleActionSelect(action)}
                                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-transparent rounded-lg transition-all text-left"
                                >
                                    <span className="text-sm sm:text-base font-medium text-slate-900">
                                        {action.name}
                                    </span>
                                    <span className="text-sm sm:text-base font-semibold text-emerald-600 ml-3">
                                        +{action.points} pts
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
