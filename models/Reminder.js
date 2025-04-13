const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if multi-user
    medicineName: { type: String, required: true },
    time: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    reminderMethod: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);
