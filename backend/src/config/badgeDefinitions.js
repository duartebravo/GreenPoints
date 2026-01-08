// Definições dos badges disponíveis
export const BADGE_DEFINITIONS = [
    // Badges por pontos totais
    {
        id: "iniciante_verde",
        name: "Iniciante Verde",
        emoji: "🌱",
        description: "Atingir 50 pontos",
        points: 50,
        criteria: (user) => user.points >= 50
    },
    {
        id: "eco_warrior",
        name: "Eco-Warrior",
        emoji: "🌿",
        description: "Atingir 200 pontos",
        points: 100,
        criteria: (user) => user.points >= 200
    },
    {
        id: "guardiao_natureza",
        name: "Guardião da Natureza",
        emoji: "🌳",
        description: "Atingir 500 pontos",
        points: 200,
        criteria: (user) => user.points >= 500
    },
    {
        id: "campeao_sustentavel",
        name: "Campeão Sustentável",
        emoji: "🏆",
        description: "Atingir 1000 pontos",
        points: 500,
        criteria: (user) => user.points >= 1000
    },

    // Badges por categoria
    {
        id: "mestre_reciclagem",
        name: "Mestre da Reciclagem",
        emoji: "♻️",
        description: "Realizar 10 ações de reciclagem",
        points: 150,
        criteria: (user) => user.actionsCount.reciclagem >= 10
    },
    {
        id: "poupador_energia",
        name: "Poupador de Energia",
        emoji: "⚡",
        description: "Realizar 10 ações de energia",
        points: 150,
        criteria: (user) => user.actionsCount.energia >= 10
    },
    {
        id: "guardiao_agua",
        name: "Guardião da Água",
        emoji: "💧",
        description: "Realizar 10 ações de água",
        points: 150,
        criteria: (user) => user.actionsCount.agua >= 10
    },
    {
        id: "mobilidade_verde",
        name: "Mobilidade Verde",
        emoji: "🚴",
        description: "Realizar 10 ações de transporte",
        points: 150,
        criteria: (user) => user.actionsCount.transporte >= 10
    },
    {
        id: "ativista_local",
        name: "Ativista Local",
        emoji: "🌍",
        description: "Realizar 5 ações de comunidade",
        points: 100,
        criteria: (user) => user.actionsCount.comunidade >= 5
    },

    // Badges por total de ações
    {
        id: "consistente",
        name: "Consistente",
        emoji: "📊",
        description: "Registar 10 ações",
        points: 75,
        criteria: (user) => {
            const total = Object.values(user.actionsCount).reduce((sum, count) => sum + count, 0);
            return total >= 10;
        }
    },
    {
        id: "dedicado",
        name: "Dedicado",
        emoji: "🔥",
        description: "Registar 50 ações",
        points: 200,
        criteria: (user) => {
            const total = Object.values(user.actionsCount).reduce((sum, count) => sum + count, 0);
            return total >= 50;
        }
    },
    {
        id: "incansavel",
        name: "Incansável",
        emoji: "💪",
        description: "Registar 100 ações",
        points: 300,
        criteria: (user) => {
            const total = Object.values(user.actionsCount).reduce((sum, count) => sum + count, 0);
            return total >= 100;
        }
    }
];

