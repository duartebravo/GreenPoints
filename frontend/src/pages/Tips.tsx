import { Lightbulb, Recycle, Zap, Droplet, Bus, Coffee, Users, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";

// Dados mockados - futuramente virão da API
const tipsByCategory = {
    all: [
        {
            id: 1,
            title: "Reduza o uso de plástico descartável",
            description: "Troque copos e talheres descartáveis por reutilizáveis. Uma pequena mudança que faz grande diferença!",
            category: "Reciclagem",
            icon: Recycle,
            color: "bg-blue-500",
            impact: "Alto",
        },
        {
            id: 2,
            title: "Desligue equipamentos em standby",
            description: "Equipamentos em modo standby consomem até 10% da energia. Desligue completamente quando não usar.",
            category: "Energia",
            icon: Zap,
            color: "bg-yellow-500",
            impact: "Médio",
        },
        {
            id: 3,
            title: "Tome banhos mais curtos",
            description: "Reduzir o tempo de banho em 2 minutos poupa cerca de 40 litros de água por dia.",
            category: "Água",
            icon: Droplet,
            color: "bg-cyan-500",
            impact: "Alto",
        },
        {
            id: 4,
            title: "Use transporte partilhado",
            description: "Partilhar boleia ou usar transporte público reduz emissões em até 50%.",
            category: "Transporte",
            icon: Bus,
            color: "bg-green-500",
            impact: "Alto",
        },
        {
            id: 5,
            title: "Leve a sua própria caneca",
            description: "Evite copos descartáveis trazendo a sua caneca reutilizável para café ou chá.",
            category: "Consumo",
            icon: Coffee,
            color: "bg-orange-500",
            impact: "Médio",
        },
        {
            id: 6,
            title: "Organize eventos eco-friendly",
            description: "Promova eventos sustentáveis na comunidade académica e inspire outros!",
            category: "Comunidade",
            icon: Users,
            color: "bg-purple-500",
            impact: "Médio",
        },
        {
            id: 7,
            title: "Prefira produtos locais",
            description: "Produtos locais têm menor pegada de carbono no transporte e apoiam a economia regional.",
            category: "Consumo",
            icon: Leaf,
            color: "bg-lime-500",
            impact: "Médio",
        },
        {
            id: 8,
            title: "Recicle corretamente",
            description: "Separe papel, plástico, vidro e metal. Verifique os ecopontos mais próximos da ESTG.",
            category: "Reciclagem",
            icon: Recycle,
            color: "bg-blue-500",
            impact: "Alto",
        },
    ],
};

const categories = [
    { id: "all", name: "Todas", icon: Lightbulb },
    { id: "recycle", name: "Reciclagem", icon: Recycle },
    { id: "energy", name: "Energia", icon: Zap },
    { id: "water", name: "Água", icon: Droplet },
    { id: "transport", name: "Transporte", icon: Bus },
    { id: "consumption", name: "Consumo", icon: Coffee },
    { id: "community", name: "Comunidade", icon: Users },
];

export default function Tips() {
    const getImpactColor = (impact: string) => {
        switch (impact) {
            case "Alto":
                return "bg-emerald-600 hover:bg-emerald-700";
            case "Médio":
                return "bg-amber-600 hover:bg-amber-700";
            case "Baixo":
                return "bg-slate-600 hover:bg-slate-700";
            default:
                return "bg-slate-600 hover:bg-slate-700";
        }
    };

    const filterTipsByCategory = (categoryId: string) => {
        if (categoryId === "all") return tipsByCategory.all;
        return tipsByCategory.all.filter((tip) => {
            const categoryMap: Record<string, string> = {
                recycle: "Reciclagem",
                energy: "Energia",
                water: "Água",
                transport: "Transporte",
                consumption: "Consumo",
                community: "Comunidade",
            };
            return tip.category === categoryMap[categoryId];
        });
    };

    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">Dicas Sustentáveis</h2>
                            <p className="text-white/90 text-sm sm:text-base">
                                {tipsByCategory.all.length} dicas para um futuro verde
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <Tabs defaultValue="all" className="w-full">
                        {/* Category Tabs - Scrollable on mobile */}
                        <div className="mb-6 -mx-4 sm:mx-0">
                            <TabsList className="w-full h-auto flex-wrap justify-start gap-2 bg-transparent p-4 sm:p-0">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <TabsTrigger
                                            key={category.id}
                                            value={category.id}
                                            className="flex items-center gap-1.5 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700"
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-xs sm:text-sm">{category.name}</span>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </div>

                        {/* Tips Content */}
                        {categories.map((category) => (
                            <TabsContent key={category.id} value={category.id} className="space-y-3 sm:space-y-4 mt-0">
                                {filterTipsByCategory(category.id).map((tip) => {
                                    const TipIcon = tip.icon;

                                    return (
                                        <Card
                                            key={tip.id}
                                            className="border-slate-200 shadow-md hover:shadow-lg hover:border-emerald-200 transition-all"
                                        >
                                            <CardContent className="p-4 sm:p-5">
                                                <div className="flex items-start gap-3 sm:gap-4">
                                                    <div
                                                        className={`w-12 h-12 sm:w-14 sm:h-14 ${tip.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}
                                                    >
                                                        <TipIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2 mb-2">
                                                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-tight">
                                                                {tip.title}
                                                            </h3>
                                                            <Badge className={`${getImpactColor(tip.impact)} flex-shrink-0`}>
                                                                {tip.impact}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-slate-600 mb-2">{tip.description}</p>
                                                        <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                                                            {tip.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}

                                {filterTipsByCategory(category.id).length === 0 && (
                                    <Card className="border-slate-200">
                                        <CardContent className="p-8 sm:p-12 text-center">
                                            <Lightbulb className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3" />
                                            <p className="text-slate-500">Sem dicas nesta categoria</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
