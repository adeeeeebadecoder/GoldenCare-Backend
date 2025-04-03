const express = require("express");
// const { bookAppointment } = require("../controllers/appointmentController");
// const { protect } = require("../middlewares/authMiddleware");
const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment); // Create appointment
router.get("/", getAppointments); // Fetch all appointments
// router.post("/", protect, bookAppointment);

module.exports = router;





