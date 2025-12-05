import Action from "../models/Action.js";
import ActionTemplate from "../models/ActionTemplate.js";
import User from "../models/User.js";
import { checkAndAwardBadges } from "../utils/badgeHelper.js";
import { updateChallengeProgress } from "../utils/challengeHelper.js";

// Listar todos os templates de ações (com filtro opcional por categoria)
export const getActionTemplates = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const templates = await ActionTemplate.find(filter).sort({ category: 1, points: -1 });
        res.json(templates);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Listar templates por categoria específica
export const getTemplatesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const templates = await ActionTemplate.find({ category }).sort({ points: -1 });
        res.json(templates);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Registar uma nova ação
export const registerAction = async (req, res) => {
    try {
        const userId = req.user.sub; // do middleware auth
        const { templateId, note } = req.body;

        // Buscar o template
        const template = await ActionTemplate.findById(templateId);
        if (!template) {
            return res.status(404).json({ error: "Template de ação não encontrado" });
        }

        // Criar a ação
        const action = await Action.create({
            userId,
            templateId: template._id,
            category: template.category,
            points: template.points,
            note: note || ""
        });

        // Atualizar pontos e contador do utilizador
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $inc: {
                    points: template.points,
                    [`actionsCount.${template.category}`]: 1
                }
            },
            { new: true } // Obter documento atualizado
        );

        // Verificar e atribuir badges
        const newBadges = await checkAndAwardBadges(updatedUser);

        // Atualizar progresso em desafios semanais
        const completedChallenges = await updateChallengeProgress(userId, template.category);

        // Popular dados para resposta
        const populatedAction = await Action.findById(action._id)
            .populate("templateId", "title description icon");

        res.status(201).json({
            message: "Ação registada com sucesso",
            action: populatedAction,
            pointsEarned: template.points,
            newBadges: newBadges.length > 0 ? newBadges : undefined,
            completedChallenges: completedChallenges.length > 0 ? completedChallenges : undefined,
            totalPoints: updatedUser.points + (completedChallenges.reduce((sum, c) => sum + c.bonusPoints, 0)),
            totalBadges: updatedUser.badges.length
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Obter histórico de ações do utilizador (com paginação)
export const getUserActions = async (req, res) => {
    try {
        const userId = req.user.sub;
        const { page = 1, limit = 20, category } = req.query;

        const filter = { userId };
        if (category) filter.category = category;

        const actions = await Action.find(filter)
            .populate("templateId", "title description icon category")
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Action.countDocuments(filter);

        res.json({
            actions,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalActions: count
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Obter ações de hoje do utilizador
export const getTodayActions = async (req, res) => {
    try {
        const userId = req.user.sub;

        // Início e fim do dia atual
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const actions = await Action.find({
            userId,
            createdAt: { $gte: today, $lt: tomorrow }
        })
            .populate("templateId", "title description icon category")
            .sort({ createdAt: -1 });

        // Calcular pontos ganhos hoje
        const pointsToday = actions.reduce((sum, action) => sum + action.points, 0);

        res.json({
            actions,
            count: actions.length,
            pointsToday
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Obter estatísticas do utilizador
export const getUserStats = async (req, res) => {
    try {
        const userId = req.user.sub;

        const user = await User.findById(userId).select("name points badges actionsCount");
        if (!user) {
            return res.status(404).json({ error: "Utilizador não encontrado" });
        }

        // Total de ações
        const totalActions = await Action.countDocuments({ userId });

        // Ranking (posição do utilizador)
        const rank = await User.countDocuments({ points: { $gt: user.points } }) + 1;

        res.json({
            user: {
                name: user.name,
                points: user.points,
                badges: user.badges,
                actionsCount: user.actionsCount
            },
            totalActions,
            rank
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
