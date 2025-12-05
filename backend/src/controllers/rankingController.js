import User from "../models/User.js";
import { getBadgeDetails } from "../utils/badgeHelper.js";

// Obter ranking global
export const getGlobalRanking = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const userId = req.user.sub; // utilizador autenticado

        // Limitar entre 1 e 100
        const safeLimit = Math.min(Math.max(parseInt(limit), 1), 100);

        // Buscar top utilizadores por pontos
        const topUsers = await User.find()
            .select("name points badges actionsCount")
            .sort({ points: -1 })
            .limit(safeLimit);

        // Mapear badges para incluir detalhes
        const rankings = topUsers.map((user, index) => {
            const badgeDetails = user.badges.map(badgeId => getBadgeDetails(badgeId));

            // Calcular total de ações (filtrar _id do Mongoose)
            const actionsObj = user.actionsCount.toObject ? user.actionsCount.toObject() : user.actionsCount;
            const totalActions = Object.entries(actionsObj)
                .filter(([key]) => key !== '_id')
                .reduce((sum, [, value]) => sum + (value || 0), 0);

            return {
                rank: index + 1,
                userId: user._id,
                name: user.name,
                points: user.points,
                badges: badgeDetails,
                totalActions
            };
        });

        // Obter ranking do utilizador atual
        const currentUser = await User.findById(userId).select("name points badges");
        const userRank = await User.countDocuments({ points: { $gt: currentUser.points } }) + 1;

        const currentUserBadges = currentUser.badges.map(badgeId => getBadgeDetails(badgeId));

        res.json({
            rankings,
            userRank: {
                rank: userRank,
                name: currentUser.name,
                points: currentUser.points,
                badges: currentUserBadges
            },
            total: await User.countDocuments()
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
