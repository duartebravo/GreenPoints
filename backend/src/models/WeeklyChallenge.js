import mongoose from "mongoose";

const weeklyChallengeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: "🎯" },
        category: {
            type: String,
            enum: ["reciclagem", "energia", "agua", "transporte", "consumo", "comunidade", null],
            default: null // null significa "qualquer categoria"
        },
        goalTarget: { type: Number, required: true, min: 1 },
        bonusPoints: { type: Number, required: true, min: 0 },
        weekNumber: { type: Number, required: true } // Número da semana do ano (1-53)
    },
    { timestamps: true }
);

// Índice para queries por semana
weeklyChallengeSchema.index({ weekNumber: 1 });

export default mongoose.model("WeeklyChallenge", weeklyChallengeSchema);
