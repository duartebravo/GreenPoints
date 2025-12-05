import WeeklyChallenge from "../models/WeeklyChallenge.js";
import ChallengeProgress from "../models/ChallengeProgress.js";
import User from "../models/User.js";
import { WEEKLY_CHALLENGES_TEMPLATES } from "../config/weeklyChallenges.config.js";

/**
 * Obter número da semana do ano (ISO 8601)
 * @param {Date} date - Data para calcular
 * @returns {number} - Número da semana (1-53)
 */
function getWeekNumber(date = new Date()) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Garante que existem desafios para a semana atual
 * Cria desafios se não existirem
 */
export async function ensureWeeklyChallenges() {
    const currentWeek = getWeekNumber();

    // Verificar se já existem desafios para esta semana
    const existingChallenges = await WeeklyChallenge.find({ weekNumber: currentWeek });

    if (existingChallenges.length >= WEEKLY_CHALLENGES_TEMPLATES.length) {
        console.log(`✅ ${existingChallenges.length} desafios já existem para semana ${currentWeek}`);
        return existingChallenges;
    }

    // Criar desafios a partir dos templates
    const newChallenges = [];
    for (const template of WEEKLY_CHALLENGES_TEMPLATES) {
        const challenge = await WeeklyChallenge.create({
            ...template,
            weekNumber: currentWeek
        });
        newChallenges.push(challenge);
    }

    console.log(`✅ Criados ${newChallenges.length} desafios para semana ${currentWeek}`);
    return newChallenges;
}

/**
 * Atualiza progresso do utilizador em desafios relevantes
 * Chamado após registar uma ação
 * @param {string} userId - ID do utilizador
 * @param {string} category - Categoria da ação (reciclagem, energia, etc.)
 * @returns {Array} - Desafios completados nesta ação (se houver)
 */
export async function updateChallengeProgress(userId, category) {
    const currentWeek = getWeekNumber();
    const completedChallenges = [];

    // Buscar desafios ativos da semana atual
    const activeChallenges = await WeeklyChallenge.find({ weekNumber: currentWeek });

    for (const challenge of activeChallenges) {
        // Verificar se este desafio é relevante para a ação
        // Desafios com category=null aceitam qualquer categoria
        if (challenge.category !== null && challenge.category !== category) {
            continue; // Saltar desafios de outras categorias
        }

        // Buscar ou criar progresso do utilizador
        let progress = await ChallengeProgress.findOne({
            userId,
            challengeId: challenge._id
        });

        if (!progress) {
            progress = await ChallengeProgress.create({
                userId,
                challengeId: challenge._id,
                progress: 0,
                completed: false
            });
        }

        // Se já completou, saltar
        if (progress.completed) {
            continue;
        }

        // Incrementar progresso
        progress.progress += 1;

        // Verificar se completou o desafio
        if (progress.progress >= challenge.goalTarget) {
            progress.completed = true;
            progress.completedAt = new Date();

            // Atribuir pontos bónus ao utilizador
            await User.findByIdAndUpdate(userId, {
                $inc: { points: challenge.bonusPoints }
            });

            // Adicionar à lista de desafios completados
            completedChallenges.push({
                id: challenge._id,
                title: challenge.title,
                icon: challenge.icon,
                bonusPoints: challenge.bonusPoints
            });
        }

        await progress.save();
    }

    return completedChallenges;
}

/**
 * Obter desafios ativos com progresso do utilizador
 * @param {string} userId - ID do utilizador
 * @returns {Array} - Desafios com progresso
 */
export async function getActiveChallengesWithProgress(userId) {
    const currentWeek = getWeekNumber();

    // Buscar desafios ativos
    const challenges = await WeeklyChallenge.find({ weekNumber: currentWeek });

    // Para cada desafio, buscar progresso do utilizador
    const challengesWithProgress = await Promise.all(
        challenges.map(async (challenge) => {
            let progress = await ChallengeProgress.findOne({
                userId,
                challengeId: challenge._id
            });

            return {
                challenge: {
                    id: challenge._id,
                    title: challenge.title,
                    description: challenge.description,
                    icon: challenge.icon,
                    category: challenge.category,
                    goalTarget: challenge.goalTarget,
                    bonusPoints: challenge.bonusPoints
                },
                userProgress: progress ? progress.progress : 0,
                completed: progress ? progress.completed : false,
                completedAt: progress ? progress.completedAt : null
            };
        })
    );

    return challengesWithProgress;
}

/**
 * Obter histórico de desafios completados pelo utilizador
 * @param {string} userId - ID do utilizador
 * @param {number} limit - Número máximo de resultados
 * @returns {Array} - Desafios completados
 */
export async function getCompletedChallenges(userId, limit = 20) {
    const completedProgress = await ChallengeProgress.find({
        userId,
        completed: true
    })
        .populate("challengeId")
        .sort({ completedAt: -1 })
        .limit(limit);

    return completedProgress.map(progress => ({
        challenge: {
            title: progress.challengeId.title,
            description: progress.challengeId.description,
            icon: progress.challengeId.icon,
            bonusPoints: progress.challengeId.bonusPoints
        },
        completedAt: progress.completedAt,
        weekNumber: progress.challengeId.weekNumber
    }));
}
