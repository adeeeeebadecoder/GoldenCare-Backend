// const mongoose = require("mongoose");

// const ReminderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   medicineName: { type: String, required: true },
//   time: { type: String, required: true },
//   dosage: { type: String },
//   notes: { type: String },
//   reminderMethod: { type: String, enum: ["Push", "Email"], required: true },
//   contact: { type: String }, // Either email or device token
// });

// module.exports = mongoose.model("Reminder", ReminderSchema);

const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if multi-user
    medicineName: String,
    time: String,
    dosage: String,
    frequency: String,
    reminderMethod: String,
    date: String,
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);
