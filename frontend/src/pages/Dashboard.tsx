import { Trophy, Award, TrendingUp, Leaf, LogOut, Lightbulb, Recycle, Zap, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";

export default function Dashboard() {
    const { user, logout } = useAuth();

    // Dados mockados - futuramente virão da API (desafios e ações recentes)
    const weeklyChallenge = {
        title: "Semana Sem Plástico",
        description: "Evite usar plásticos descartáveis durante toda a semana",
        progress: 3,
        total: 7,
        percentage: 43,
    };
    const recentActions = [
        { id: 1, action: "Reciclei papel", time: "Ontem às 14:30", points: 50 },
        { id: 2, action: "Usei transporte público", time: "Ontem às 09:15", points: 30 },
        { id: 3, action: "Trouxe garrafa reutilizável", time: "Há 2 dias", points: 20 },
    ];

    // Dicas de sustentabilidade
    const tips = [
        { id: 1, text: "Reduza o uso de plástico descartável", icon: Recycle, color: "bg-blue-500" },
        { id: 2, text: "Desligue equipamentos em standby", icon: Zap, color: "bg-yellow-500" },
        { id: 3, text: "Tome banhos mais curtos", icon: Droplet, color: "bg-cyan-500" },
    ];

    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-1">
                                Olá, {user?.name.split(" ")[0]}! 👋
                            </h2>
                            <p className="text-white/90 text-sm sm:text-base">
                                Continue fazendo a diferença!
                            </p>
                        </div>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-lg">
                            <CardContent className="p-4 sm:p-5 md:p-6 text-white">
                                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                                <p className="text-2xl sm:text-3xl font-bold mb-1">{user?.points ?? 0}</p>
                                <p className="text-xs sm:text-sm opacity-90">Pontos Totais</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 shadow-lg">
                            <CardContent className="p-4 sm:p-5 md:p-6 text-white">
                                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                                <p className="text-2xl sm:text-3xl font-bold mb-1">#~</p>
                                <p className="text-xs sm:text-sm opacity-90">Posição Ranking</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Achievements */}
                    <Card className="border-emerald-200 shadow-md">
                        <CardContent className="p-4 sm:p-5 md:p-6">
                            <div className="flex items-center gap-2 mb-4 sm:mb-5">
                                <Award className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                                    Conquistas Recentes
                                </h3>
                            </div>

                            <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-2 shadow-md">
                                        <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
                                        Eco Warrior
                                    </p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2 shadow-md">
                                        <svg
                                            className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
                                        Recycler Pro
                                    </p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-2 shadow-md">
                                        <svg
                                            className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
                                        Energy Saver
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Challenge */}
                    <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
                        <CardContent className="p-4 sm:p-5 md:p-6">
                            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                                        Desafio da Semana
                                    </h3>
                                </div>
                                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                    Ativo
                                </Badge>
                            </div>

                            <h4 className="text-slate-900 font-semibold mb-2">
                                {weeklyChallenge.title}
                            </h4>
                            <p className="text-sm text-slate-600 mb-4">
                                {weeklyChallenge.description}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Progresso</span>
                                    <span className="text-emerald-700 font-semibold">
                                        {weeklyChallenge.progress}/{weeklyChallenge.total} dias
                                    </span>
                                </div>
                                <Progress
                                    value={weeklyChallenge.percentage}
                                    className="h-3 bg-emerald-100"
                                />
                            </div>

                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-10 sm:h-11">
                                Ver Detalhes
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Actions */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
                            Ações Recentes
                        </h3>

                        <div className="space-y-3">
                            {recentActions.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div>
                                        <p className="text-sm sm:text-base text-slate-900 font-medium">
                                            {item.action}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
                                    </div>
                                    <span className="text-emerald-600 font-semibold text-sm sm:text-base">
                                        +{item.points} pontos
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            className="w-full mt-4 border-emerald-600 text-emerald-700 hover:bg-emerald-50 h-10 sm:h-11"
                        >
                            Registar Nova Ação
                        </Button>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-4 border-t border-slate-200">
                        <Button
                            onClick={logout}
                            variant="outline"
                            className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 h-10 sm:h-11"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>

                    {/* Tips Section */}
                    <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-md">
                        <CardContent className="p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className="w-5 h-5 text-teal-600" />
                                <h3 className="text-base sm:text-lg font-semibold text-teal-700">Dicas Sustentáveis</h3>
                            </div>
                            <div className="space-y-3">
                                {tips.map((tip) => {
                                    const TipIcon = tip.icon;
                                    return (
                                        <div
                                            key={tip.id}
                                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-teal-100"
                                        >
                                            <div
                                                className={`w-10 h-10 ${tip.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}
                                            >
                                                <TipIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <p className="text-sm text-slate-700 flex-1">{tip.text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="text-center pt-2">
                        <p className="text-xs text-slate-500">
                            © 2025 ESTG - Instituto Politécnico de Viana do Castelo
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
