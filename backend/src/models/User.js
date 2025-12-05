import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@ipvc\.pt$/, "Email tem de ser institucional @ipvc.pt"]
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    points: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    actionsCount: {
      type: {
        reciclagem: { type: Number, default: 0 },
        energia: { type: Number, default: 0 },
        agua: { type: Number, default: 0 },
        transporte: { type: Number, default: 0 },
        consumo: { type: Number, default: 0 },
        comunidade: { type: Number, default: 0 }
      },
      default: {
        reciclagem: 0,
        energia: 0,
        agua: 0,
        transporte: 0,
        consumo: 0,
        comunidade: 0
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
