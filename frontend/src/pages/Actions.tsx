import { useState, useEffect } from "react";
import {
  X,
  Recycle,
  Zap,
  Droplet,
  Bus,
  Coffee,
  Users,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { actionsApi } from "@/lib/apiServices";
import { useAuth } from "@/hooks/useAuth";

// Category icons mapping - PORTUGUESE category names to match backend
const categoryIcons: Record<string, any> = {
  reciclagem: { icon: Recycle, color: "bg-blue-500" },
  energia: { icon: Zap, color: "bg-yellow-500" },
  agua: { icon: Droplet, color: "bg-cyan-500" },
  transporte: { icon: Bus, color: "bg-green-500" },
  consumo: { icon: Coffee, color: "bg-orange-500" },
  comunidade: { icon: Users, color: "bg-purple-500" },
};

// Portuguese category display names
const categoryNames: Record<string, string> = {
  reciclagem: "Reciclagem",
  energia: "Energia",
  agua: "Água",
  transporte: "Transporte",
  consumo: "Consumo",
  comunidade: "Comunidade",
};

interface ActionTemplate {
  _id: string;
  title: string;
  description?: string;
  category: string;
  points: number;
  icon?: string;
}

interface TodayAction {
  templateId: {
    title: string;
  };
  points: number;
  createdAt: string;
}

export default function Actions() {
  const { refreshUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [templates, setTemplates] = useState<ActionTemplate[]>([]);
  const [todayData, setTodayData] = useState<{
    actions: TodayAction[];
    pointsToday: number;
    count: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load templates and today's actions on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [templatesData, todayActionsData] = await Promise.all([
        actionsApi.getTemplates() as Promise<ActionTemplate[]>,
        actionsApi.getTodayActions() as Promise<{
          actions: TodayAction[];
          pointsToday: number;
          count: number;
        }>,
      ]);
      setTemplates(templatesData);
      setTodayData(todayActionsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group templates by category
  const categoriesWithCounts = Object.keys(categoryIcons).map((catId) => {
    const count = templates.filter((t) => t.category === catId).length;
    return {
      id: catId,
      name: categoryNames[catId],
      ...categoryIcons[catId],
      actions: count,
    };
  });

  const getTemplatesByCategory = (category: string) => {
    return templates.filter((t) => t.category === category);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowPopup(true);
  };

  const handleActionSelect = async (template: ActionTemplate) => {
    try {
      setSubmitting(true);
      await actionsApi.registerAction(template._id);

      // Refresh user data and today's actions
      await Promise.all([refreshUser(), loadData()]);

      setShowPopup(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error registering action:", error);
      alert("Erro ao registar ação. Tente novamente.");
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-semibold mb-1">
            Registar Ações
          </h2>
          <p className="text-white/90 text-sm sm:text-base">
            Conte-nos as suas ações sustentáveis
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Today Stats */}
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md">
            <CardContent className="p-4 sm:p-5">
              <h3 className="text-slate-600 text-sm font-semibold mb-3">
                Hoje
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-700">
                    +{todayData?.pointsToday ?? 0}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    pontos ganhos
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-700">
                    {todayData?.count ?? 0}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    ações registadas
                  </p>
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
              {categoriesWithCounts.map((category) => {
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
                    <p className="text-xs text-slate-500">
                      {category.actions} ações
                    </p>
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

            {todayData && todayData.actions.length > 0 ? (
              <div className="space-y-2 sm:space-y-3">
                {todayData.actions.map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-medium text-slate-900 truncate">
                        {action.templateId.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatTime(action.createdAt)}
                      </p>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-emerald-600 ml-3 flex-shrink-0">
                      +{action.points} pontos
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-slate-200">
                <CardContent className="p-8 text-center">
                  <p className="text-slate-500">
                    Ainda não registaste nenhuma ação hoje
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Popup/Modal */}
      {showPopup && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center sm:justify-center z-50 animate-in fade-in">
          <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl max-h-[85vh] sm:max-h-[600px] flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 shadow-2xl">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-200 flex-shrink-0">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                {
                  categoriesWithCounts.find((c) => c.id === selectedCategory)
                    ?.name
                }
              </h3>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setSelectedCategory(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                disabled={submitting}
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="space-y-2 p-6 pt-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
              {getTemplatesByCategory(selectedCategory).map((template) => (
                <button
                  key={template._id}
                  onClick={() => handleActionSelect(template)}
                  disabled={submitting}
                  className="w-full flex items-center justify-between p-3 sm:p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-transparent rounded-lg transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-sm sm:text-base font-medium text-slate-900 flex-1 pr-2">
                    {template.title}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-emerald-600 flex items-center gap-2 flex-shrink-0">
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    +{template.points} pts
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
