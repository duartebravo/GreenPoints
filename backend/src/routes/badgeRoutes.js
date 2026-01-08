import express from "express";
import { auth } from "../middleware/auth.js";
import { getUserBadgeProgress } from "../utils/badgeHelper.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * GET /badges/me
 * Obter badges do utilizador autenticado
 */
router.get("/me", auth, async (req, res) => {
    try {
        const userId = req.user.sub;

        // Buscar utilizador completo do MongoDB
        const user = await User.findById(userId).select("badges actionsCount points");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilizador não encontrado"
            });
        }

        // Converter para objeto simples (sem métodos do Mongoose)
        const userObj = user.toObject();

        // Log para debug
        console.log("User actionsCount:", userObj.actionsCount);

        // Obter badges conquistados e disponíveis com progresso
        const badgeData = getUserBadgeProgress(userObj);

        res.json({
            success: true,
            data: badgeData
        });
    } catch (error) {
        console.error("Error fetching user badges:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao obter badges do utilizador"
        });
    }
});

export default router;
