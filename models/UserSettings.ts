import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  notifications: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false },
  language: { type: String, default: "en" },
  timezone: { type: String, default: "UTC" },
});

export default mongoose.models.UserSettings || mongoose.model("UserSettings", userSettingsSchema); 