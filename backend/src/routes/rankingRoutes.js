import { Router } from "express";
import { getGlobalRanking } from "../controllers/rankingController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getGlobalRanking);

export default router;
