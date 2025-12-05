import { getActiveChallengesWithProgress, getCompletedChallenges } from "../utils/challengeHelper.js";

/**
 * Obter desafios ativos da semana com progresso do utilizador
 * GET /api/challenges
 */
export const getActiveChallenges = async (req, res) => {
    try {
        const userId = req.user.sub;

        const challenges = await getActiveChallengesWithProgress(userId);

        res.json({
            challenges,
            count: challenges.length
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

/**
 * Obter histórico de desafios completados pelo utilizador
 * GET /api/challenges/progress
 */
export const getUserProgress = async (req, res) => {
    try {
        const userId = req.user.sub;
        const { limit = 20 } = req.query;

        const completedChallenges = await getCompletedChallenges(userId, parseInt(limit));

        res.json({
            completedChallenges,
            count: completedChallenges.length
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
