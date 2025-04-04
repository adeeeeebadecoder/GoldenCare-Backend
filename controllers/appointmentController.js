const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
// Create new appointment
// const createAppointment = async (req, res) => {
//   const {
//     patientName,
//     doctorName,
//     appointmentDate,
//     appointmentTime,
//     contactNumber,
//   } = req.body;

//   if (!patientName || !doctorName || !appointmentDate || !appointmentTime) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const appointment = new Appointment(req.body);
//     await appointment.save();
//     res
//       .status(201)
//       .json({ message: "Appointment scheduled successfully", appointment });
//   } catch (error) {
//     console.error("Error scheduling appointment:", error); // 🔍 Add this
//     res.status(500).json({ error: "Error scheduling appointment" });
//   }
// };

// routes/appointments.js
const createAppointment = async (req, res) => {
  const {
    patientName,
    doctorName,
    appointmentDate,
    appointmentTime,
    contactNumber,
  } = req.body;

  const doctor = await Doctor.findOne({ name: doctorName });

  const createAppointment = new Appointment({
    patientName,
    doctorName,
    appointmentDate,
    appointmentTime,
    contactNumber,
    userId: req.user.id,
    doctorId: doctor._id,
  });

  await createAppointment.save();
  res.status(201).json(createAppointment);
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

module.exports = { createAppointment, getAppointments };
