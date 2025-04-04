const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

router.post("/",protect, createAppointment); // Create appointment
router.get("/", getAppointments); // Fetch all appointments

// Get appointments for doctors
router.get("/doctor", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all appointments for admin
router.get("/admin", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update appointment status (Doctor/Admin only)

router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Allow only the doctor assigned to this appointment OR an admin to update status

    if (
      req.user.role !== "admin" &&
      req.user.id !== String(appointment.doctorId)
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    appointment.appointmentStatus = status;
    await appointment.save();

    res.json({ message: "Status updated successfully", appointment });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
