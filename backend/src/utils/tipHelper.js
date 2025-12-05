import { SUSTAINABILITY_TIPS } from "../config/sustainabilityTips.js";

/**
 * Obter uma dica aleatória
 * @returns {Object} Dica aleatória
 */
export function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * SUSTAINABILITY_TIPS.length);
    return SUSTAINABILITY_TIPS[randomIndex];
}

/**
 * Obter uma dica aleatória de uma categoria específica
 * @param {string} category - Categoria da dica
 * @returns {Object} Dica da categoria ou aleatória se categoria não existir
 */
export function getTipByCategory(category) {
    const categoryTips = SUSTAINABILITY_TIPS.filter(tip => tip.category === category);

    if (categoryTips.length === 0) {
        // Se não houver dicas da categoria, retorna uma aleatória
        return getRandomTip();
    }

    const randomIndex = Math.floor(Math.random() * categoryTips.length);
    return categoryTips[randomIndex];
}

/**
 * Obter a "dica do dia" baseada na data
 * A mesma dica é retornada para todos no mesmo dia
 * @returns {Object} Dica do dia
 */
export function getDailyTip() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const tipIndex = dayOfYear % SUSTAINABILITY_TIPS.length;

    return SUSTAINABILITY_TIPS[tipIndex];
}

/**
 * Obter todas as dicas
 * @returns {Array} Todas as dicas
 */
export function getAllTips() {
    return SUSTAINABILITY_TIPS;
}

/**
 * Obter dicas de uma categoria
 * @param {string} category - Categoria
 * @returns {Array} Dicas da categoria
 */
export function getTipsByCategory(category) {
    return SUSTAINABILITY_TIPS.filter(tip => tip.category === category);
}
