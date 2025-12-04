import { Router } from "express";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/health", (_, res) => res.json({ ok: true, service: "GreenPoints API" }));

// rota protegida de exemplo
router.get("/me", auth, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});

export default router;
