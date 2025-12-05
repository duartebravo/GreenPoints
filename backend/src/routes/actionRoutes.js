import { Router } from "express";
import {
    getActionTemplates,
    getTemplatesByCategory,
    registerAction,
    getUserActions,
    getTodayActions,
    getUserStats
} from "../controllers/actionController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Rotas de templates (públicas ou protegidas, você decide)
router.get("/templates", auth, getActionTemplates);
router.get("/templates/:category", auth, getTemplatesByCategory);

// Rotas de ações (protegidas)
router.post("/", auth, registerAction);
router.get("/history", auth, getUserActions);
router.get("/today", auth, getTodayActions);
router.get("/stats", auth, getUserStats);

export default router;
