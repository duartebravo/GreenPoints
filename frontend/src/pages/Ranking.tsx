import { useEffect, useState } from "react";
import { Trophy, Crown, Medal, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";
import { rankingApi } from "@/lib/apiServices";

interface RankedUser {
  userId: {
    _id: string;
    name: string;
    course?: string;
  };
  totalPoints: number;
  rank: number;
}

export default function Ranking() {
  const { user } = useAuth();
  const [rankings, setRankings] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    try {
      setLoading(true);
      console.log("🔍 [Ranking] Fetching ranking data...");

      const data = (await rankingApi.getGlobal()) as Promise<{
        rankings: any[];
        userRank: any;
        total: number;
      }>;
      const resolvedData = await data;

      console.log("📊 [Ranking] Backend response:", resolvedData);
      console.log("📊 [Ranking] Rankings array:", resolvedData?.rankings);
      console.log(
        "📊 [Ranking] Rankings length:",
        resolvedData?.rankings?.length,
      );

      // Map backend response to frontend format
      if (resolvedData && resolvedData.rankings) {
        const mappedRankings = resolvedData.rankings.map((item: any) => {
          console.log("👤 [Ranking] Mapping user:", item);
          return {
            userId: {
              _id: item.userId,
              name: item.name,
              course: "ESTG",
            },
            totalPoints: item.points,
            rank: item.rank,
          };
        });

        console.log("✅ [Ranking] Mapped rankings:", mappedRankings);
        setRankings(mappedRankings);
      } else {
        console.warn("⚠️ [Ranking] No rankings data in response");
      }
    } catch (error) {
      console.error("❌ [Ranking] Error loading ranking:", error);
    } finally {
      setLoading(false);
      console.log("🏁 [Ranking] Loading complete");
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const currentUserRank = rankings.findIndex((r) => r.userId._id === user?.id);
  const topUsers = rankings.slice(0, 3);
  const otherUsers = rankings.slice(3);

  if (loading) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
      </div>
    );
  }

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
              <p className="text-white/90 text-sm sm:text-base">
                Melhores utilizadores da ESTG
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="space-y-6">
            {rankings.length === 0 ? (
              <Card className="border-slate-200">
                <CardContent className="p-12 text-center">
                  <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg font-semibold mb-2">
                    Sem rankings disponíveis
                  </p>
                  <p className="text-slate-400 text-sm">
                    Regista algumas ações para aparecer no ranking!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Podium - Top 3 */}
                {topUsers.length >= 3 && (
                  <div className="flex items-end justify-center gap-3 sm:gap-4 mb-6">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center flex-1 max-w-[110px]">
                      <Medal className="w-6 h-6 sm:w-7 sm:h-7 text-slate-400 mb-2" />
                      <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-slate-300 shadow-lg mb-2">
                        <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-500 text-white font-semibold">
                          {getUserInitials(topUsers[1].userId.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm sm:text-base font-semibold text-slate-900 text-center truncate w-full">
                        {topUsers[1].userId.name.split(" ")[0]}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                        {topUsers[1].totalPoints.toLocaleString()} pts
                      </p>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center flex-1 max-w-[130px] relative">
                      <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mb-2" />
                      <Avatar className="w-18 h-18 sm:w-20 sm:h-20 border-4 border-amber-400 shadow-xl mb-2">
                        <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold text-lg">
                          {getUserInitials(topUsers[0].userId.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-base sm:text-lg font-bold text-slate-900 text-center truncate w-full">
                        {topUsers[0].userId.name.split(" ")[0]}
                      </p>
                      <p className="text-sm sm:text-base text-amber-700 font-bold">
                        {topUsers[0].totalPoints.toLocaleString()} pts
                      </p>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center flex-1 max-w-[110px]">
                      <Medal className="w-6 h-6 sm:w-7 sm:h-7 text-amber-700 mb-2" />
                      <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-amber-600 shadow-lg mb-2">
                        <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-white font-semibold">
                          {getUserInitials(topUsers[2].userId.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm sm:text-base font-semibold text-slate-900 text-center truncate w-full">
                        {topUsers[2].userId.name.split(" ")[0]}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                        {topUsers[2].totalPoints.toLocaleString()} pts
                      </p>
                    </div>
                  </div>
                )}

                {/* Current User Highlight */}
                {currentUserRank !== -1 && currentUserRank >= 3 && (
                  <Card className="border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md">
                    <CardContent className="p-4">
                      <p className="text-xs text-emerald-700 font-semibold mb-2">
                        A Tua Posição
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-emerald-700">
                            #{currentUserRank + 1}
                          </span>
                          <Avatar className="w-10 h-10 border-2 border-emerald-400">
                            <AvatarFallback className="bg-emerald-600 text-white font-semibold">
                              {getUserInitials(user?.name || "")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm sm:text-base font-semibold text-slate-900">
                              {user?.name}
                            </p>
                            <p className="text-xs text-slate-600">
                              {rankings[currentUserRank].userId.course ||
                                "ESTG"}
                            </p>
                          </div>
                        </div>
                        <span className="text-base font-bold text-emerald-700">
                          {rankings[
                            currentUserRank
                          ].totalPoints.toLocaleString()}{" "}
                          pts
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Other Rankings */}
                <div className="space-y-2 sm:space-y-3">
                  {otherUsers.map((rankedUser) => {
                    const isCurrentUser = rankedUser.userId._id === user?.id;

                    return (
                      <Card
                        key={rankedUser.userId._id}
                        className={`${
                          isCurrentUser
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-slate-200"
                        } shadow-sm`}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="text-base sm:text-lg font-bold text-slate-600 w-8 text-center flex-shrink-0">
                                #{rankedUser.rank}
                              </span>
                              <Avatar className="w-10 h-10 border-2 border-slate-200 flex-shrink-0">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                                  {getUserInitials(rankedUser.userId.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                                  {rankedUser.userId.name}
                                </p>
                                <p className="text-xs text-slate-600 truncate">
                                  {rankedUser.userId.course || "ESTG"}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm sm:text-base font-bold text-slate-700 ml-3 flex-shrink-0">
                              {rankedUser.totalPoints.toLocaleString()} pts
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
