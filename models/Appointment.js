// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema(
//   {
//     patientName: String,
//     doctorName: String,

//     doctorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Doctor",
//       required: true,
//     },
//     date: { type: Date, required: true },
//     status: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Completed"],
//       default: "Pending",
//     },

//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     appointmentDate: String,
//     appointmentTime: String,
//     contactNumber: String,
//     appointmentStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Appointment", appointmentSchema);

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  contactNumber: { type: String },
  appointmentStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if needed
});

module.exports = mongoose.model("Appointment", appointmentSchema);
