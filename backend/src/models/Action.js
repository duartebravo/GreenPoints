import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        templateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ActionTemplate",
            required: true
        },
        category: { type: String, required: true }, // denormalizado para queries rápidas
        points: { type: Number, required: true },
        note: { type: String, default: "" }
    },
    { timestamps: true }
);

// Índices para queries comuns
actionSchema.index({ userId: 1, createdAt: -1 });
actionSchema.index({ userId: 1, category: 1 });

export default mongoose.model("Action", actionSchema);
