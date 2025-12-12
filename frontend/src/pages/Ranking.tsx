import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";

// Dados mockados - futuramente virão da API
const topUsers = [
    { name: "Ana Silva", points: 5420, position: 1, trend: "+12%", type: "Aluno", course: "Eng. Informática" },
    { name: "João Costa", points: 4850, position: 2, trend: "+8%", type: "Professor", course: "Gestão" },
    { name: "Maria Santos", points: 4320, position: 3, trend: "+15%", type: "Aluno", course: "Design" },
];

const otherUsers = [
    { name: "Pedro Oliveira", points: 3890, position: 4, trend: "+5%", type: "Funcionário", course: "Eng. Civil" },
    { name: "Sofia Ferreira", points: 3540, position: 5, trend: "+10%", type: "Aluno", course: "Contabilidade" },
    { name: "Lucas Pereira", points: 3210, position: 6, trend: "+3%", type: "Aluno", course: "Marketing" },
    { name: "Beatriz Alves", points: 2980, position: 7, trend: "+7%", type: "Professor", course: "Turismo" },
];

const topCourses = [
    { name: "Engenharia Informática", points: 45230, students: 156 },
    { name: "Design", points: 38450, students: 98 },
    { name: "Gestão", points: 34120, students: 142 },
    { name: "Contabilidade", points: 28340, students: 87 },
    { name: "Marketing", points: 24890, students: 103 },
];

export default function Ranking() {
    const { user } = useAuth();

    // Simular posição do utilizador atual no ranking (futuramente virá da API)
    const userPosition = 8;
    const userTrend = "+15%";

    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">Rankings</h2>
                            <p className="text-white/90 text-sm">Novembro 2025</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <Tabs defaultValue="individual" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="individual">Individual</TabsTrigger>
                            <TabsTrigger value="cursos">Cursos</TabsTrigger>
                        </TabsList>

                        {/* TAB INDIVIDUAL */}
                        <TabsContent value="individual" className="space-y-4 sm:space-y-6 mt-0">
                            {/* Podium - Top 3 */}
                            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 shadow-md">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-end justify-center gap-2 sm:gap-4">
                                        {/* 2nd Place */}
                                        <div className="flex flex-col items-center flex-1">
                                            <Medal className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400 mb-2" />
                                            <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-slate-300 mb-2">
                                                <AvatarFallback className="bg-slate-200 text-slate-700 text-sm sm:text-base">
                                                    {topUsers[1].name.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p className="text-xs sm:text-sm font-medium text-slate-900 text-center">
                                                {topUsers[1].name.split(" ")[0]} {topUsers[1].name.split(" ")[1]?.[0]}.
                                            </p>
                                            <Badge variant="outline" className="text-xs mb-1 mt-1">
                                                {topUsers[1].type}
                                            </Badge>
                                            <p className="text-xs sm:text-sm font-semibold text-slate-700">
                                                {topUsers[1].points.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* 1st Place */}
                                        <div className="flex flex-col items-center flex-1">
                                            <Crown className="w-9 h-9 sm:w-10 sm:h-10 text-amber-500 mb-2 animate-pulse" />
                                            <Avatar className="w-18 h-18 sm:w-20 sm:h-20 border-4 border-amber-500 mb-2 shadow-lg">
                                                <AvatarFallback className="bg-amber-100 text-amber-700 text-base sm:text-lg font-bold">
                                                    {topUsers[0].name.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p className="text-sm sm:text-base font-semibold text-slate-900 text-center">
                                                {topUsers[0].name.split(" ")[0]} {topUsers[0].name.split(" ")[1]?.[0]}.
                                            </p>
                                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs mb-1 mt-1">
                                                {topUsers[0].type}
                                            </Badge>
                                            <p className="text-sm sm:text-base font-bold text-emerald-600">
                                                {topUsers[0].points.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* 3rd Place */}
                                        <div className="flex flex-col items-center flex-1">
                                            <Medal className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 mb-2" />
                                            <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-amber-400 mb-2">
                                                <AvatarFallback className="bg-amber-100 text-amber-700 text-sm sm:text-base">
                                                    {topUsers[2].name.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p className="text-xs sm:text-sm font-medium text-slate-900 text-center">
                                                {topUsers[2].name.split(" ")[0]} {topUsers[2].name.split(" ")[1]?.[0]}.
                                            </p>
                                            <Badge variant="outline" className="text-xs mb-1 mt-1">
                                                {topUsers[2].type}
                                            </Badge>
                                            <p className="text-xs sm:text-sm font-semibold text-slate-700">
                                                {topUsers[2].points.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Rankings List - Posições 4+ */}
                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-sm font-semibold text-slate-600 px-1">Outras Posições</h3>

                                {otherUsers.map((rankUser) => (
                                    <Card key={rankUser.position} className="border-slate-200 hover:shadow-md transition-shadow">
                                        <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                                            <span className="w-8 text-center font-semibold text-slate-500 text-sm sm:text-base">
                                                #{rankUser.position}
                                            </span>
                                            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                                                <AvatarFallback className="bg-slate-200 text-slate-700">
                                                    {rankUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm sm:text-base font-medium text-slate-900 truncate">
                                                    {rankUser.name}
                                                </p>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <Badge variant="outline" className="text-xs">
                                                        {rankUser.type}
                                                    </Badge>
                                                    <p className="text-xs text-slate-500 truncate">{rankUser.course}</p>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm sm:text-base font-semibold text-emerald-700">
                                                    {rankUser.points.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-green-600 flex items-center gap-0.5">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {rankUser.trend}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Posição do Utilizador Atual (destacada) */}
                                <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
                                    <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                                        <span className="w-8 text-center font-bold text-blue-700 text-sm sm:text-base">
                                            #{userPosition}
                                        </span>
                                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-blue-500">
                                            <AvatarFallback className="bg-blue-200 text-blue-700 font-semibold">
                                                {user?.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm sm:text-base font-semibold text-blue-900 truncate">
                                                Tu ({user?.name.split(" ")[0]})
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                                                    Aluno
                                                </Badge>
                                                <p className="text-xs text-blue-600">Eng. Informática</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm sm:text-base font-bold text-blue-700">
                                                {user?.points.toLocaleString() ?? 0}
                                            </p>
                                            <p className="text-xs text-green-600 flex items-center gap-0.5 justify-end">
                                                <TrendingUp className="w-3 h-3" />
                                                {userTrend}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* TAB CURSOS */}
                        <TabsContent value="cursos" className="space-y-3 mt-0">
                            <h3 className="text-sm font-semibold text-slate-600 px-1 mb-4">Top Cursos por Pontos</h3>

                            {topCourses.map((course, index) => (
                                <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 flex items-center gap-3 sm:gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold shadow-md">
                                            #{index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                                                {course.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {course.students} estudantes ativos
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-base sm:text-lg font-bold text-emerald-700">
                                                {course.points.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-slate-500">pontos</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
