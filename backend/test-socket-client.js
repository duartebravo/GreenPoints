// Cliente de teste para Socket.IO - Dicas de Sustentabilidade
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

console.log("🔌 Conectando ao servidor...\n");

const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"]
});

socket.on("connect", () => {
    console.log("✅ Conectado ao servidor!");
    console.log("Socket ID:", socket.id);
    console.log("\n--- Aguardando dica do dia... ---\n");
});

// Receber dica do dia (ao conectar)
socket.on("tip:daily", (data) => {
    console.log("📅 DICA DO DIA:");
    console.log(`   ${data.tip.icon} ${data.tip.title}`);
    console.log(`   ${data.tip.content}`);
    console.log(`   Categoria: ${data.tip.category}`);
    console.log(`   Timestamp: ${new Date(data.timestamp).toLocaleString()}`);
    console.log("\n--- Aguardando 3s para pedir dica aleatória... ---\n");

    // Pedir dica aleatória após 3 segundos
    setTimeout(() => {
        console.log("📤 Pedindo dica aleatória...");
        socket.emit("tip:request");
    }, 3000);
});

// Receber nova dica (aleatória ou de categoria)
socket.on("tip:new", (data) => {
    console.log(`\n${data.type === 'random' ? '🎲' : '📂'} NOVA DICA (${data.type.toUpperCase()}):`);
    console.log(`   ${data.tip.icon} ${data.tip.title}`);
    console.log(`   ${data.tip.content}`);
    console.log(`   Categoria: ${data.tip.category}`);
    console.log(`   Timestamp: ${new Date(data.timestamp).toLocaleString()}`);

    if (data.type === 'random') {
        console.log("\n--- Aguardando 3s para pedir dica de categoria... ---\n");
        setTimeout(() => {
            console.log("📤 Pedindo dica de 'energia'...");
            socket.emit("tip:category", { category: "energia" });
        }, 3000);
    } else if (data.type === 'category') {
        console.log("\n--- Aguardando broadcast periódico... ---");
        console.log("(O servidor envia dica a cada 10 minutos)");
        console.log("Pressione Ctrl+C para sair\n");
    }
});

// Receber broadcast periódico
socket.on("tip:broadcast", (data) => {
    console.log("\n📢 BROADCAST PERIÓDICO:");
    console.log(`   ${data.tip.icon} ${data.tip.title}`);
    console.log(`   ${data.tip.content}`);
    console.log(`   Categoria: ${data.tip.category}`);
    console.log(`   Timestamp: ${new Date(data.timestamp).toLocaleString()}\n`);
});

socket.on("disconnect", () => {
    console.log("❌ Desconectado do servidor");
});

socket.on("connect_error", (error) => {
    console.error("❌ Erro de conexão:", error.message);
});

// Manter script rodando
console.log("💡 Cliente de teste iniciado. Pressione Ctrl+C para sair.\n");
