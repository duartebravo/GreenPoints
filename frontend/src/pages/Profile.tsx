import { useEffect, useState } from "react";
import {
  User,
  TrendingUp,
  Award,
  LogOut,
  Calendar,
  CheckCircle,
  Star,
  Loader2,
  Unlock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";
import { actionsApi, badgesApi } from "@/lib/apiServices";



interface RecentActivity {
  _id: string;
  templateId: {
    title: string;
  };
  points: number;
  createdAt: string;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [stats, setStats] = useState<{
    totalActions: number;
    rank: number;
  } | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<any[]>([]);
  const [availableBadges, setAvailableBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFullHistory, setShowFullHistory] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const limit = showFullHistory ? undefined : 5;
      const [activityData, statsData, badgesData] = await Promise.all([
        actionsApi.getHistory(limit) as Promise<{ actions: RecentActivity[] }>,
        actionsApi.getStats() as Promise<{
          totalActions: number;
          rank: number;
        }>,
        badgesApi.getMyBadges() as Promise<{
          success: boolean;
          data: { earned: any[]; available: any[] };
        }>,
      ]);

      const resolvedActivity = await activityData;
      const resolvedStats = await statsData;

      if (resolvedActivity && resolvedActivity.actions) {
        setRecentActivity(resolvedActivity.actions);
      }
      if (resolvedStats) {
        setStats(resolvedStats);
      }
      if (badgesData && badgesData.data) {
        setEarnedBadges(badgesData.data.earned);
        setAvailableBadges(badgesData.data.available);
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showFullHistory) {
      loadProfileData();
    }
  }, [showFullHistory]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short" }) +
      " às " +
      date.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Use stats from API or calculate from user actionsCount
  const actionsCompleted =
    stats?.totalActions ??
    (user?.actionsCount
      ? Object.entries(user.actionsCount)
        .filter(([key, value]) => key !== "_id" && typeof value === "number")
        .reduce((acc, [, count]) => acc + count, 0)
      : 0);
  const rankingPosition = stats?.rank ?? 8;

  // Calculate active days based on account creation date
  const calculateActiveDays = () => {
    if (!user?.createdAt) return 0;
    const createdDate = new Date(user.createdAt);
    const now = new Date();
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  const activeDays = calculateActiveDays();

  const userInitials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header com Avatar */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-white text-indigo-600 text-xl sm:text-2xl font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1 truncate">
                {user?.name}
              </h2>
              <p className="text-sm sm:text-base text-white/90 mb-1 truncate">
                {user?.email}
              </p>
              <Badge className="bg-white/20 hover:bg-white/30 border-0">
                <User className="w-3 h-3 mr-1" />
                {user?.role === "admin" ? "Administrador" : "Aluno"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          {/* Stats Card */}
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-emerald-700 text-base sm:text-lg">
                <TrendingUp className="w-5 h-5" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-emerald-700 mb-1">
                    {actionsCompleted}
                  </p>
                  <p className="text-xs text-slate-600">Ações Completas</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-blue-700 mb-1">
                    {user?.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-600">Pontos Totais</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-purple-700 mb-1">
                    #{rankingPosition}
                  </p>
                  <p className="text-xs text-slate-600">Posição Ranking</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-amber-700 mb-1">
                    {activeDays}
                  </p>
                  <p className="text-xs text-slate-600">Dias Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges Card with Tabs */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-amber-700 text-base sm:text-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Badges
                </div>
                <span className="text-sm font-normal text-amber-600">
                  {earnedBadges.length}/{earnedBadges.length + availableBadges.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="earned" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="earned">Conquistadas</TabsTrigger>
                  <TabsTrigger value="locked">Disponíveis</TabsTrigger>
                </TabsList>

                {/* Earned Badges */}
                <TabsContent value="earned" className="space-y-3 mt-0">
                  {earnedBadges.map((badge, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-200"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md text-2xl sm:text-3xl">
                          {badge.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-semibold text-slate-900">
                            {badge.name}
                          </p>
                          <p className="text-xs text-slate-600 truncate">
                            {badge.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-green-700 mt-1">
                            <CheckCircle className="w-3 h-3" />
                            {badge.earnedDate}
                          </div>
                        </div>
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0 text-xs">
                          +{badge.points}
                        </Badge>
                      </div>
                    );
                  })}
                </TabsContent>

                {/* Available Badges */}
                <TabsContent value="locked" className="space-y-3 mt-0">
                  {availableBadges.map((badge, index) => {
                    const progressPercent =
                      (badge.progress / badge.target) * 100;

                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md relative">
                          <Unlock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-base font-semibold text-slate-700">
                                {badge.name}
                              </p>
                              <p className="text-xs text-slate-600 truncate">
                                {badge.description}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="border-slate-400 text-slate-600 flex-shrink-0 text-xs"
                            >
                              +{badge.points}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-600">Progresso</span>
                              <span className="text-slate-700 font-semibold">
                                {badge.progress}/{badge.target}
                              </span>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card className="border-slate-200 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-slate-700 text-base sm:text-lg">
                <Calendar className="w-5 h-5" />
                Histórico de Atividade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              {recentActivity.length > 0 ? (
                <>
                  {recentActivity
                    .slice(0, showFullHistory ? undefined : 5)
                    .map((activity) => (
                      <div
                        key={activity._id}
                        className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-100"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-medium text-slate-900 truncate">
                            {activity.templateId.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatTime(activity.createdAt)}
                          </p>
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-emerald-600 ml-3 flex-shrink-0">
                          +{activity.points}
                        </span>
                      </div>
                    ))}

                  {!showFullHistory && recentActivity.length >= 5 && (
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 h-10 sm:h-11"
                      onClick={() => setShowFullHistory(true)}
                    >
                      Ver Histórico Completo
                    </Button>
                  )}

                  {showFullHistory && (
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 h-10 sm:h-11"
                      onClick={() => setShowFullHistory(false)}
                    >
                      Ver Menos
                    </Button>
                  )}
                </>
              ) : loading ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-8 h-8 text-slate-400 mx-auto animate-spin" />
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-slate-500">Sem atividade recente</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button
            onClick={logout}
            variant="destructive"
            className="w-full h-11 sm:h-12 bg-red-600 hover:bg-red-700 shadow-md"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Terminar Sessão
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
