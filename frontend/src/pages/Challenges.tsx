import { Target, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";

// Dados mockados - futuramente virão da API
const activeChallenges = [
    {
        id: 1,
        title: "Semana Sem Plástico",
        description: "Evite usar plásticos descartáveis durante toda a semana",
        progress: 3,
        target: 7,
        reward: 200,
        deadline: "4 dias restantes",
    },
    {
        id: 2,
        title: "Reciclar 20 Itens",
        description: "Recicle 20 itens diferentes esta semana",
        progress: 12,
        target: 20,
        reward: 150,
        deadline: "6 dias restantes",
    },
];

const upcomingChallenges = [
    {
        id: 3,
        title: "Mês do Transporte Sustentável",
        description: "Use transporte público, bicicleta ou caminhe durante 20 dias",
        reward: 500,
        startsIn: "Começa em 5 dias",
    },
    {
        id: 4,
        title: "Desafio da Água",
        description: "Economize água com ações conscientes durante 2 semanas",
        reward: 300,
        startsIn: "Começa em 12 dias",
    },
];

const completedChallenges = [
    {
        id: 5,
        title: "Reciclar 10 Itens",
        description: "Recicle 10 itens diferentes",
        reward: 100,
        completedDate: "Completado há 3 dias",
    },
    {
        id: 6,
        title: "Primeira Semana Verde",
        description: "Faça 5 ações sustentáveis em uma semana",
        reward: 150,
        completedDate: "Completado há 1 semana",
    },
    {
        id: 7,
        title: "Poupar Energia",
        description: "Desligue equipamentos não utilizados durante 5 dias",
        reward: 120,
        completedDate: "Completado há 2 semanas",
    },
];

export default function Challenges() {
    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">Desafios</h2>
                            <p className="text-white/90 text-sm sm:text-base">Complete e ganhe pontos extras</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <Tabs defaultValue="active" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="active">Ativos</TabsTrigger>
                            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                            <TabsTrigger value="completed">Completos</TabsTrigger>
                        </TabsList>

                        {/* TAB: Active Challenges */}
                        <TabsContent value="active" className="space-y-4 mt-0">
                            {activeChallenges.map((challenge) => {
                                const progressPercent = (challenge.progress / challenge.target) * 100;

                                return (
                                    <Card
                                        key={challenge.id}
                                        className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <CardContent className="p-4 sm:p-5">
                                            <div className="flex items-start justify-between mb-3 gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                                                        {challenge.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 mb-3">
                                                        {challenge.description}
                                                    </p>
                                                </div>
                                                <Badge className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0">
                                                    +{challenge.reward} pts
                                                </Badge>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-600">Progresso</span>
                                                    <span className="text-emerald-700 font-semibold">
                                                        {challenge.progress}/{challenge.target}
                                                    </span>
                                                </div>
                                                <Progress value={progressPercent} className="h-3" />

                                                <div className="flex items-center gap-1 text-xs sm:text-sm text-amber-700">
                                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    {challenge.deadline}
                                                </div>
                                            </div>

                                            <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 h-10">
                                                Ver Detalhes
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}

                            {activeChallenges.length === 0 && (
                                <Card className="border-slate-200">
                                    <CardContent className="p-8 sm:p-12 text-center">
                                        <Target className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500">Sem desafios ativos no momento</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* TAB: Upcoming Challenges */}
                        <TabsContent value="upcoming" className="space-y-4 mt-0">
                            {upcomingChallenges.map((challenge) => (
                                <Card
                                    key={challenge.id}
                                    className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <CardContent className="p-4 sm:p-5">
                                        <div className="flex items-start justify-between mb-3 gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                                                    {challenge.title}
                                                </h3>
                                                <p className="text-sm text-slate-600 mb-3">
                                                    {challenge.description}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="border-blue-500 text-blue-700 flex-shrink-0"
                                            >
                                                +{challenge.reward} pts
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-1 text-sm text-blue-700 font-medium">
                                            <Clock className="w-4 h-4" />
                                            {challenge.startsIn}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {upcomingChallenges.length === 0 && (
                                <Card className="border-slate-200">
                                    <CardContent className="p-8 sm:p-12 text-center">
                                        <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500">Sem desafios próximos</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* TAB: Completed Challenges */}
                        <TabsContent value="completed" className="space-y-3 mt-0">
                            {completedChallenges.map((challenge) => (
                                <Card
                                    key={challenge.id}
                                    className="border-slate-200 bg-slate-50 hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                                                    {challenge.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                                                    {challenge.description}
                                                </p>
                                                <p className="text-xs text-slate-500">{challenge.completedDate}</p>
                                            </div>

                                            <Badge className="bg-green-600 hover:bg-green-700 flex-shrink-0">
                                                +{challenge.reward}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {completedChallenges.length === 0 && (
                                <Card className="border-slate-200">
                                    <CardContent className="p-8 sm:p-12 text-center">
                                        <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500">Ainda não completaste nenhum desafio</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
