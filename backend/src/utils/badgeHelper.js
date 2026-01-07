import { BADGE_DEFINITIONS } from "../config/badgeDefinitions.js";

/**
 * Verifica quais badges o utilizador merece e atribui os novos
 * @param {Object} user - Documento do utilizador (com points e actionsCount)
 * @returns {Array} - Array de badges recém-conquistados
 */
export async function checkAndAwardBadges(user) {
    const currentBadges = user.badges || [];
    const newBadges = [];

    // Verificar cada badge definido
    for (const badgeDef of BADGE_DEFINITIONS) {
        // Se o utilizador já tem este badge, saltar
        if (currentBadges.includes(badgeDef.id)) {
            continue;
        }

        // Verificar se cumpre o critério
        if (badgeDef.criteria(user)) {
            newBadges.push({
                id: badgeDef.id,
                name: badgeDef.name,
                emoji: badgeDef.emoji,
                description: badgeDef.description
            });

            // Adicionar à lista de badges do utilizador
            user.badges.push(badgeDef.id);
        }
    }

    // Guardar se houver novos badges
    if (newBadges.length > 0) {
        await user.save();
    }

    return newBadges;
}

/**
 * Obter detalhes de um badge pelo ID
 * @param {string} badgeId - ID do badge
 * @returns {Object} - Detalhes do badge
 */
export function getBadgeDetails(badgeId) {
    const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
    if (!badge) return null;

    return {
        id: badge.id,
        name: badge.name,
        emoji: badge.emoji,
        description: badge.description
    };
}

/**
 * Obter todos os badges disponíveis
 * @returns {Array} - Lista de todos os badges
 */
export function getAllBadges() {
    return BADGE_DEFINITIONS.map(badge => ({
        id: badge.id,
        name: badge.name,
        emoji: badge.emoji,
        description: badge.description
    }));
}

/**
 * Obter progresso do utilizador em todos os badges
 * @param {Object} user - Documento do utilizador
 * @returns {Object} - { earned: [...], available: [...] }
 */
export function getUserBadgeProgress(user) {
    const currentBadges = user.badges || [];
    const earned = [];
    const available = [];

    for (const badgeDef of BADGE_DEFINITIONS) {
        const badgeInfo = {
            id: badgeDef.id,
            name: badgeDef.name,
            emoji: badgeDef.emoji,
            description: badgeDef.description
        };

        // Se já conquistou este badge
        if (currentBadges.includes(badgeDef.id)) {
            earned.push(badgeInfo);
        } else {
            // Calcular progresso para badges não conquistados
            const progress = calculateBadgeProgress(user, badgeDef);
            available.push({
                ...badgeInfo,
                progress: progress.current,
                target: progress.target
            });
        }
    }

    return { earned, available };
}

/**
 * Calcular progresso específico de um badge
 * @param {Object} user - Documento do utilizador
 * @param {Object} badgeDef - Definição do badge
 * @returns {Object} - { current: number, target: number }
 */
function calculateBadgeProgress(user, badgeDef) {
    const id = badgeDef.id;

    // Badges baseados em pontos totais
    if (id === "iniciante_verde") return { current: user.points, target: 50 };
    if (id === "eco_warrior") return { current: user.points, target: 200 };
    if (id === "guardiao_natureza") return { current: user.points, target: 500 };
    if (id === "campeao_sustentavel") return { current: user.points, target: 1000 };

    // Badges baseados em categorias específicas
    if (id === "mestre_reciclagem") return { current: user.actionsCount.reciclagem || 0, target: 10 };
    if (id === "poupador_energia") return { current: user.actionsCount.energia || 0, target: 10 };
    if (id === "guardiao_agua") return { current: user.actionsCount.agua || 0, target: 10 };
    if (id === "mobilidade_verde") return { current: user.actionsCount.transporte || 0, target: 10 };
    if (id === "ativista_local") return { current: user.actionsCount.comunidade || 0, target: 5 };

    // Badges baseados em total de ações
    const totalActions = Object.values(user.actionsCount).reduce((sum, count) => sum + count, 0);
    if (id === "consistente") return { current: totalActions, target: 10 };
    if (id === "dedicado") return { current: totalActions, target: 50 };
    if (id === "incansavel") return { current: totalActions, target: 100 };

    return { current: 0, target: 1 };
}

/**
 * Obter os badges mais recentemente conquistados
 * @param {Object} user - Documento do utilizador
 * @param {number} limit - Número máximo de badges a retornar
 * @returns {Array} - Últimos badges conquistados
 */
export function getRecentlyEarnedBadges(user, limit = 3) {
    const currentBadges = user.badges || [];
    
    // Como não temos data de conquista, retornar os últimos badges da lista
    // (os mais recentes são os últimos adicionados)
    const recentBadgeIds = currentBadges.slice(-limit).reverse();
    
    return recentBadgeIds.map(badgeId => {
        const badgeDef = BADGE_DEFINITIONS.find(b => b.id === badgeId);
        if (!badgeDef) return null;
        
        return {
            id: badgeDef.id,
            name: badgeDef.name,
            emoji: badgeDef.emoji,
            description: badgeDef.description
        };
    }).filter(badge => badge !== null);
}
