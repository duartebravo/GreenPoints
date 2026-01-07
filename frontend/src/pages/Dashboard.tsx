import { useEffect, useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import {
  Trophy,
  Award,
  TrendingUp,
  Leaf,
  Lightbulb,
  Recycle,
  Zap,
  Droplet,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";
import NotificationPanel from "@/components/NotificationPanel";
import { challengesApi, actionsApi, rankingApi, badgesApi } from "@/lib/apiServices";

interface Challenge {
  _id: string;
  title: string;
  description: string;
  category: string;
  targetCount: number;
  bonusPoints: number;
  startDate: string;
  endDate: string;
  userProgress?: number;
}

interface RecentAction {
  _id: string;
  templateId: {
    title: string;
  };
  points: number;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [weeklyChallenge, setWeeklyChallenge] = useState<Challenge | null>(
    null,
  );
  const [recentActions, setRecentActions] = useState<RecentAction[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [recentBadges, setRecentBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [challengesData, actionsData, rankingData, badgesData] = await Promise.all([
        challengesApi.getActive() as Promise<{
          challenges: any[];
          count: number;
        }>,
        actionsApi.getHistory(3) as Promise<{ actions: RecentAction[] }>,
        rankingApi.getGlobal() as Promise<{
          rankings: any[];
          userRank: any;
          total: number;
        }>,
        badgesApi.getMyBadges() as Promise<{
          success: boolean;
          data: { earned: any[]; available: any[] };
        }>,
      ]);

      // Get first active challenge as weekly challenge
      if (
        challengesData &&
        challengesData.challenges &&
        challengesData.challenges.length > 0
      ) {
        const firstChallenge = challengesData.challenges[0];
        setWeeklyChallenge({
          _id: firstChallenge.challenge.id,
          title: firstChallenge.challenge.title,
          description: firstChallenge.challenge.description,
          category: firstChallenge.challenge.category,
          targetCount: firstChallenge.challenge.goalTarget,
          bonusPoints: firstChallenge.challenge.bonusPoints,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          userProgress: firstChallenge.userProgress,
        });
      }

      if (actionsData && actionsData.actions) {
        setRecentActions(actionsData.actions);
      }

      // Set user ranking position
      if (rankingData && rankingData.userRank) {
        setUserRank(rankingData.userRank.rank);
      }

      // Set recent badges (last 3 earned)
      if (badgesData && badgesData.data && badgesData.data.earned) {
        setRecentBadges(badgesData.data.earned.slice(-3).reverse());
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Há alguns minutos";
    if (diffInHours < 24)
      return `Há ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `Há ${diffInDays} dia${diffInDays > 1 ? "s" : ""}`;
  };

  // Dicas de sustentabilidade
  const tips = [
    {
      id: 1,
      text: "Reduza o uso de plástico descartável",
      icon: Recycle,
      color: "bg-blue-500",
    },
    {
      id: 2,
      text: "Desligue equipamentos em standby",
      icon: Zap,
      color: "bg-yellow-500",
    },
    {
      id: 3,
      text: "Tome banhos mais curtos",
      icon: Droplet,
      color: "bg-cyan-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

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
                Continua a fazer a diferença!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <NotificationPanel />
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-lg">
              <CardContent className="p-4 sm:p-5 md:p-6 text-white">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                <p className="text-2xl sm:text-3xl font-bold mb-1">
                  {user?.points ?? 0}
                </p>
                <p className="text-xs sm:text-sm opacity-90">Pontos Totais</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 shadow-lg">
              <CardContent className="p-4 sm:p-5 md:p-6 text-white">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                <p className="text-2xl sm:text-3xl font-bold mb-1">
                  #{userRank ?? "~"}
                </p>
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

              {recentBadges.length > 0 ? (
                <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
                  {recentBadges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-2 shadow-md text-2xl sm:text-3xl">
                        {badge.emoji}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 text-center font-medium max-w-[80px]">
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-500 text-sm">
                    Ainda não conquistaste nenhum badge. Continua a realizar ações sustentáveis!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Challenge */}
          {weeklyChallenge ? (
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
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

                <div className="space-y-2 ">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progresso</span>
                    <span className="text-emerald-700 font-semibold">
                      {weeklyChallenge.userProgress ?? 0}/
                      {weeklyChallenge.targetCount}
                    </span>
                  </div>
                  <Progress
                    value={
                      ((weeklyChallenge.userProgress ?? 0) /
                        weeklyChallenge.targetCount) *
                      100
                    }
                    className="h-3 bg-emerald-100"
                  />
                </div>


              </CardContent>
            </Card>
          ) : (
            <Card className="border-slate-200">
              <CardContent className="p-8 text-center">
                <p className="text-slate-500">Sem desafios ativos no momento</p>
              </CardContent>
            </Card>
          )}

          {/* Recent Actions */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
              Ações Recentes
            </h3>

            {recentActions.length > 0 ? (
              <div className="space-y-3">
                {recentActions.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="text-sm sm:text-base text-slate-900 font-medium">
                        {item.templateId.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatTime(item.createdAt)}
                      </p>
                    </div>
                    <span className="text-emerald-600 font-semibold text-sm sm:text-base">
                      +{item.points} pontos
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-slate-200">
                <CardContent className="p-8 text-center">
                  <p className="text-slate-500">
                    Ainda não registaste nenhuma ação
                  </p>
                </CardContent>
              </Card>
            )}
            <Button
              variant="outline"
              className="w-full mt-4 border-emerald-600 text-emerald-700 hover:bg-emerald-50 h-10 sm:h-11"
              onClick={() => navigate("/actions")}
            >
              Registar Nova Ação
            </Button>
          </div>

          {/* Tips Section */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-md">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-teal-600" />
                <h3 className="text-base sm:text-lg font-semibold text-teal-700">
                  Dicas Sustentáveis
                </h3>
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
                      <p className="text-sm text-slate-700 flex-1">
                        {tip.text}
                      </p>
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
