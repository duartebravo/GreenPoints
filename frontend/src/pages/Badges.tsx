import { Award, Lock, Star, Trophy, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";

// Dados mockados - futuramente virão da API
const earnedBadges = [
    {
        id: 1,
        name: "Eco Warrior",
        description: "Complete 50 ações sustentáveis",
        icon: "award",
        color: "bg-emerald-500",
        earnedDate: "Conquistado há 3 dias",
        points: 100,
    },
    {
        id: 2,
        name: "Recycler Pro",
        description: "Recicle 100 itens diferentes",
        icon: "shield",
        color: "bg-blue-500",
        earnedDate: "Conquistado há 1 semana",
        points: 150,
    },
    {
        id: 3,
        name: "Streak Master",
        description: "Mantenha uma sequência de 30 dias",
        icon: "flame",
        color: "bg-orange-500",
        earnedDate: "Conquistado há 2 semanas",
        points: 200,
    },
    {
        id: 4,
        name: "Point Master",
        description: "Acumule 1000 pontos",
        icon: "star",
        color: "bg-purple-500",
        earnedDate: "Conquistado há 1 mês",
        points: 150,
    },
];

const lockedBadges = [
    {
        id: 5,
        name: "Transport Hero",
        description: "Use transporte sustentável por 60 dias",
        icon: "trophy",
        color: "bg-green-500",
        progress: 35,
        target: 60,
        points: 250,
    },
    {
        id: 6,
        name: "Water Saver",
        description: "Complete 50 ações de economia de água",
        icon: "droplet",
        color: "bg-cyan-500",
        progress: 22,
        target: 50,
        points: 180,
    },
    {
        id: 7,
        name: "Energy Champion",
        description: "Economize energia 100 vezes",
        icon: "zap",
        color: "bg-yellow-500",
        progress: 67,
        target: 100,
        points: 200,
    },
    {
        id: 8,
        name: "Community Leader",
        description: "Organize 10 eventos sustentáveis",
        icon: "users",
        color: "bg-pink-500",
        progress: 3,
        target: 10,
        points: 300,
    },
    {
        id: 9,
        name: "Green Expert",
        description: "Atinja 5000 pontos totais",
        icon: "leaf",
        color: "bg-lime-500",
        progress: 2847,
        target: 5000,
        points: 500,
    },
    {
        id: 10,
        name: "Top 10 Ranker",
        description: "Alcance o top 10 do ranking",
        icon: "crown",
        color: "bg-amber-500",
        progress: 8,
        target: 10,
        points: 350,
    },
];

export default function Badges() {
    const { user } = useAuth();

    const renderBadgeIcon = (icon: string, className: string) => {
        const iconClass = className;

        switch (icon) {
            case "award":
                return <Award className={iconClass} />;
            case "shield":
                return (
                    <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                );
            case "flame":
                return (
                    <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                    </svg>
                );
            case "star":
                return <Star className={iconClass} />;
            case "trophy":
                return <Trophy className={iconClass} />;
            default:
                return <Award className={iconClass} />;
        }
    };

    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">Badges</h2>
                            <p className="text-white/90 text-sm sm:text-base">
                                {user?.badges.length ?? earnedBadges.length} de {earnedBadges.length + lockedBadges.length} conquistadas
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <Tabs defaultValue="earned" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="earned">Conquistadas</TabsTrigger>
                            <TabsTrigger value="locked">Bloqueadas</TabsTrigger>
                        </TabsList>

                        {/* TAB: Earned Badges */}
                        <TabsContent value="earned" className="space-y-3 sm:space-y-4 mt-0">
                            {earnedBadges.map((badge) => (
                                <Card key={badge.id} className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md hover:shadow-lg transition-shadow">
                                    <CardContent className="p-4 sm:p-5">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${badge.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                {renderBadgeIcon(badge.icon, "w-8 h-8 sm:w-10 sm:h-10 text-white")}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                                                        {badge.name}
                                                    </h3>
                                                    <BadgeUI className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0">
                                                        +{badge.points}
                                                    </BadgeUI>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-2">{badge.description}</p>
                                                <div className="flex items-center gap-1 text-xs sm:text-sm text-green-700">
                                                    <CheckCircle className="w-4 h-4" />
                                                    {badge.earnedDate}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {earnedBadges.length === 0 && (
                                <Card className="border-slate-200">
                                    <CardContent className="p-8 sm:p-12 text-center">
                                        <Award className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500">Ainda não conquistaste nenhuma badge</p>
                                        <p className="text-xs text-slate-400 mt-2">
                                            Complete desafios e ações para desbloquear!
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* TAB: Locked Badges */}
                        <TabsContent value="locked" className="space-y-3 sm:space-y-4 mt-0">
                            {lockedBadges.map((badge) => {
                                const progressPercent = (badge.progress / badge.target) * 100;

                                return (
                                    <Card key={badge.id} className="border-slate-300 bg-slate-50 shadow-md hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4 sm:p-5">
                                            <div className="flex items-start gap-3 sm:gap-4">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0 relative shadow-md">
                                                    <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h3 className="text-base sm:text-lg font-semibold text-slate-700">
                                                            {badge.name}
                                                        </h3>
                                                        <BadgeUI variant="outline" className="border-slate-400 text-slate-600 flex-shrink-0">
                                                            +{badge.points}
                                                        </BadgeUI>
                                                    </div>
                                                    <p className="text-sm text-slate-600 mb-3">{badge.description}</p>

                                                    <div className="space-y-1">
                                                        <div className="flex justify-between text-xs sm:text-sm">
                                                            <span className="text-slate-600">Progresso</span>
                                                            <span className="text-slate-700 font-semibold">
                                                                {badge.progress}/{badge.target}
                                                            </span>
                                                        </div>
                                                        <Progress value={progressPercent} className="h-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
