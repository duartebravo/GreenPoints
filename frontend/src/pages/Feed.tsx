import { Heart, MessageCircle, Share2, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";

// Dados mockados - futuramente virão da API
const feedPosts = [
    {
        id: 1,
        user: { name: "Ana Silva", course: "Eng. Informática", initials: "AS" },
        action: "Reciclou 5 garrafas de plástico",
        points: 50,
        time: "Há 5 minutos",
        likes: 12,
        comments: 3,
        category: "Reciclagem",
        categoryColor: "bg-blue-500",
    },
    {
        id: 2,
        user: { name: "Pedro Costa", course: "Design", initials: "PC" },
        action: "Usou transporte público durante toda a semana",
        points: 100,
        time: "Há 1 hora",
        likes: 24,
        comments: 7,
        category: "Transporte",
        categoryColor: "bg-green-500",
    },
    {
        id: 3,
        user: { name: "Maria Santos", course: "Gestão", initials: "MS" },
        action: "Trouxe garrafa reutilizável",
        points: 20,
        time: "Há 2 horas",
        likes: 8,
        comments: 2,
        category: "Consumo",
        categoryColor: "bg-orange-500",
    },
    {
        id: 4,
        user: { name: "João Oliveira", course: "Eng. Civil", initials: "JO" },
        action: "Organizou limpeza de praia com 20 participantes",
        points: 200,
        time: "Há 3 horas",
        likes: 45,
        comments: 12,
        category: "Comunidade",
        categoryColor: "bg-purple-500",
    },
    {
        id: 5,
        user: { name: "Sofia Ferreira", course: "Contabilidade", initials: "SF" },
        action: "Desligou luzes e equipamentos não utilizados",
        points: 30,
        time: "Há 5 horas",
        likes: 15,
        comments: 4,
        category: "Energia",
        categoryColor: "bg-yellow-500",
    },
    {
        id: 6,
        user: { name: "Lucas Pereira", course: "Marketing", initials: "LP" },
        action: "Reduziu tempo de banho para 5 minutos",
        points: 25,
        time: "Há 8 horas",
        likes: 10,
        comments: 1,
        category: "Água",
        categoryColor: "bg-cyan-500",
    },
];

export default function Feed() {
    return (
        <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">Feed</h2>
                            <p className="text-white/90 text-sm sm:text-base">Ações da comunidade ESTG</p>
                        </div>
                    </div>
                </div>

                {/* Feed Posts */}
                <div className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                    {feedPosts.map((post) => (
                        <Card key={post.id} className="border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-4 sm:p-5">
                                {/* User Header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-slate-200">
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                                            {post.user.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                                            {post.user.name}
                                        </p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-xs text-slate-500">{post.user.course}</p>
                                            <span className="text-slate-300">•</span>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Clock className="w-3 h-3" />
                                                {post.time}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge className={`${post.categoryColor} hover:opacity-90 text-xs flex-shrink-0`}>
                                        {post.category}
                                    </Badge>
                                </div>

                                {/* Action Content */}
                                <div className="mb-3 sm:mb-4">
                                    <p className="text-sm sm:text-base text-slate-900 mb-2">{post.action}</p>
                                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-full">
                                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-semibold text-emerald-700">
                                            +{post.points} pontos
                                        </span>
                                    </div>
                                </div>

                                {/* Engagement Actions */}
                                <div className="flex items-center gap-4 sm:gap-6 pt-3 border-t border-slate-100">
                                    <button className="flex items-center gap-1.5 text-slate-600 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-sm font-medium">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-slate-600 hover:text-blue-500 transition-colors">
                                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-sm font-medium">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-slate-600 hover:text-green-500 transition-colors ml-auto">
                                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-sm font-medium">Partilhar</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Load More Button */}
                    <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 h-11">
                        Carregar mais posts
                    </Button>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
