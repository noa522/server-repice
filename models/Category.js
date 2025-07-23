const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  recipeCount: { type: Number, default: 0 },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }] // 🆕 חסר!
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);