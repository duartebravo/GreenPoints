import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

// REST routes
app.use("/api/auth", authRoutes);
app.use("/api", indexRoutes);

// HTTP + WebSockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, credentials: true }
});

// eventos em tempo real (ex.: pontos atualizados)
io.on("connection", (socket) => {
  console.log("🔌 socket conectado:", socket.id);

  // exemplo: receber atualização de pontos e difundir a todos
  socket.on("points:update", (payload) => {
    io.emit("points:updated", payload);
  });

  socket.on("disconnect", () => console.log("🔌 socket saiu:", socket.id));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  await connectDB(process.env.MONGO_URL);
  console.log(`🚀 API em http://localhost:${PORT}`);
});
