import { useEffect, useState } from "react";
import { Trophy, Calendar, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";
import { challengesApi } from "@/lib/apiServices";

interface Challenge {
  _id: string;
  title: string;
  description: string;
  category: string;
  targetCount: number;
  bonusPoints: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
  userProgress?: number;
  isCompleted?: boolean;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const data = (await challengesApi.getActive()) as Promise<{
        challenges: any[];
        count: number;
      }>;
      const resolvedData = await data;

      console.log("🔍 [Challenges] Backend response:", resolvedData);

      // Map the backend response to frontend format
      if (resolvedData && resolvedData.challenges) {
        const mappedChallenges = resolvedData.challenges.map((item: any) => {
          // Verificar se está completo: ou pelo campo completed ou se progresso >= meta
          const isCompleted =
            item.completed || item.userProgress >= item.challenge.goalTarget;

          console.log(
            "📋 [Challenge]",
            item.challenge.title,
            "- Completed:",
            item.completed,
            "- Progress:",
            item.userProgress,
            "/",
            item.challenge.goalTarget,
            "- IsCompleted:",
            isCompleted,
          );
          return {
            _id: item.challenge.id,
            title: item.challenge.title,
            description: item.challenge.description,
            category: item.challenge.category,
            targetCount: item.challenge.goalTarget,
            bonusPoints: item.challenge.bonusPoints,
            startDate: new Date().toISOString(), // Week start
            endDate: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000,
            ).toISOString(), // Week end
            userProgress: item.userProgress,
            isActive: !isCompleted,
            isCompleted: isCompleted,
          };
        });

        console.log("✅ [Challenges] Mapped challenges:", mappedChallenges);
        console.log(
          "✅ [Challenges] Completed challenges:",
          mappedChallenges.filter((c) => c.isCompleted).length,
        );
        console.log(
          "✅ [Challenges] Active challenges:",
          mappedChallenges.filter((c) => !c.isCompleted).length,
        );

        setChallenges(mappedChallenges);
      }
    } catch (error) {
      console.error("Error loading challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short" });
  };

  const activeChallenges = challenges.filter((c) => {
    const now = new Date();
    const start = new Date(c.startDate);
    const end = new Date(c.endDate);
    return now >= start && now <= end && !c.isCompleted;
  });

  const upcomingChallenges = challenges.filter((c) => {
    const now = new Date();
    const start = new Date(c.startDate);
    return now < start && !c.isCompleted;
  });

  const completedChallenges = challenges.filter((c) => c.isCompleted);

  if (loading) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">Desafios</h2>
              <p className="text-white/90 text-sm sm:text-base">
                {activeChallenges.length} desafios ativos
              </p>
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

            {/* Active Challenges */}
            <TabsContent value="active" className="space-y-4 mt-0">
              {activeChallenges.length > 0 ? (
                activeChallenges.map((challenge) => {
                  const progress = challenge.userProgress ?? 0;
                  const progressPercentage =
                    (progress / challenge.targetCount) * 100;

                  return (
                    <Card
                      key={challenge._id}
                      className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md"
                    >
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                              {challenge.title}
                            </h3>
                            <p className="text-sm text-slate-600 mb-2">
                              {challenge.description}
                            </p>
                          </div>
                          <Badge className="bg-purple-600 hover:bg-purple-700 ml-3 flex-shrink-0">
                            +{challenge.bonusPoints} pts
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Progresso</span>
                            <span className="text-purple-700 font-semibold">
                              {progress}/{challenge.targetCount}
                            </span>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-2 bg-purple-100"
                          />
                        </div>

                        <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Termina: {formatDate(challenge.endDate)}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-purple-700 border-purple-300"
                          >
                            {challenge.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="border-slate-200">
                  <CardContent className="p-12 text-center">
                    <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">
                      Sem desafios ativos no momento
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Verifica os próximos desafios!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Upcoming Challenges */}
            <TabsContent value="upcoming" className="space-y-4 mt-0">
              {upcomingChallenges.length > 0 ? (
                upcomingChallenges.map((challenge) => (
                  <Card
                    key={challenge._id}
                    className="border-slate-200 shadow-sm"
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                            {challenge.title}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {challenge.description}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-purple-300 text-purple-700 ml-3 flex-shrink-0"
                        >
                          +{challenge.bonusPoints} pts
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Começa: {formatDate(challenge.startDate)}</span>
                        </div>
                        <Badge variant="outline" className="border-slate-300">
                          {challenge.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-slate-200">
                  <CardContent className="p-12 text-center">
                    <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">
                      Sem desafios próximos agendados
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Completed Challenges */}
            <TabsContent value="completed" className="space-y-4 mt-0">
              {completedChallenges.length > 0 ? (
                completedChallenges.map((challenge) => (
                  <Card
                    key={challenge._id}
                    className="border-emerald-200 bg-emerald-50 shadow-sm"
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                            {challenge.title}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {challenge.description}
                          </p>
                        </div>
                        <CheckCircle className="w-6 h-6 text-emerald-600 ml-3 flex-shrink-0" />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-emerald-700">
                        <span className="font-semibold">
                          +{challenge.bonusPoints} pontos ganhos
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-slate-200">
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">
                      Ainda não completaste nenhum desafio
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Completa desafios ativos para ganhares pontos bónus!
                    </p>
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
