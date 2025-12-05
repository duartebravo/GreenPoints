import mongoose from "mongoose";

const challengeProgressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        challengeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WeeklyChallenge",
            required: true
        },
        progress: { type: Number, default: 0, min: 0 },
        completed: { type: Boolean, default: false },
        completedAt: { type: Date, default: null }
    },
    { timestamps: true }
);

// Índice único: cada utilizador só pode ter 1 registo por desafio
challengeProgressSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

// Índice para queries de progresso do utilizador
challengeProgressSchema.index({ userId: 1, completed: 1 });

export default mongoose.model("ChallengeProgress", challengeProgressSchema);
