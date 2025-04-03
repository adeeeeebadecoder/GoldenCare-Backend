const Appointment = require("../models/Appointment");

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment scheduled successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: "Error scheduling appointment" });
  }
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
