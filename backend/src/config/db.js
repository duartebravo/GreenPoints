import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB ligado");
  } catch (err) {
    console.error("❌ Erro a ligar ao MongoDB", err);
    process.exit(1);
  }
}
