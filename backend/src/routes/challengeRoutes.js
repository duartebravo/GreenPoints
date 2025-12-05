import { Router } from "express";
import { getActiveChallenges, getUserProgress } from "../controllers/challengeController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Rotas de desafios (protegidas com autenticação)
router.get("/", auth, getActiveChallenges);
router.get("/progress", auth, getUserProgress);

export default router;
