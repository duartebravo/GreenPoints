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
