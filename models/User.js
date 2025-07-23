const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  address: { type: String, required: true }, // 🆕 חסר!
  role: { type: String, default: "user", enum: ["user", "admin", "guest"] } // 🆕 הוספתי guest
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);