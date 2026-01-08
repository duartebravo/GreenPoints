import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
import actionRoutes from "./routes/actionRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import { seedActionTemplates } from "./config/seedActionTemplates.js";
import { getRandomTip, getTipByCategory, getDailyTip } from "./utils/tipHelper.js";
import { ensureWeeklyChallenges } from "./utils/challengeHelper.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

// REST routes
app.use("/api/auth", authRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/rankings", rankingRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api", indexRoutes);

// HTTP + WebSockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, credentials: true }
});

// eventos em tempo real - dicas de sustentabilidade
io.on("connection", (socket) => {
  console.log("🔌 socket conectado:", socket.id);

  // Enviar dica de boas-vindas ao conectar
  const welcomeTip = getDailyTip();
  socket.emit("tip:daily", {
    type: "daily",
    tip: welcomeTip,
    timestamp: new Date()
  });

  // Cliente pede uma dica aleatória
  socket.on("tip:request", () => {
    const tip = getRandomTip();
    socket.emit("tip:new", {
      type: "random",
      tip,
      timestamp: new Date()
    });
  });

  // Cliente pede dica de categoria específica
  socket.on("tip:category", (data) => {
    const { category } = data;
    const tip = getTipByCategory(category);
    socket.emit("tip:new", {
      type: "category",
      category,
      tip,
      timestamp: new Date()
    });
  });

  // Exemplo: pontos atualizados (manter compatibilidade)
  socket.on("points:update", (payload) => {
    io.emit("points:updated", payload);
  });

  socket.on("disconnect", () => console.log("🔌 socket saiu:", socket.id));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  await connectDB(process.env.MONGO_URL);
  await seedActionTemplates(); // Popular templates de ações
  await ensureWeeklyChallenges(); // Garantir desafios semanais

  // Broadcast periódico de dicas (a cada 2 minutos)
  setInterval(() => {
    const tip = getRandomTip();
    io.emit("tip:broadcast", {
      type: "periodic",
      tip,
      timestamp: new Date()
    });
    console.log("📢 Dica enviada:", tip.title);
  }, 2 * 60 * 1000); // 2 minutos


  console.log(`🚀 API em http://localhost:${PORT}`);
  console.log(`💡 Dicas periódicas ativadas (a cada 2 min)`);
});

// Exportar io para uso em outros módulos (opcional)
export { io };
