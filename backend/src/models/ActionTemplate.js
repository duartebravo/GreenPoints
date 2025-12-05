import mongoose from "mongoose";

const actionTemplateSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["reciclagem", "energia", "agua", "transporte", "consumo", "comunidade"]
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    icon: { type: String, default: "🌱" }
  },
  { timestamps: true }
);

// Índice para queries rápidas por categoria
actionTemplateSchema.index({ category: 1 });

export default mongoose.model("ActionTemplate", actionTemplateSchema);
