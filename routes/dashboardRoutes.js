const express = require("express");
const {
  getUserDetails,
  getUserAppointments,
} = require("../controllers/dashboardController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get user details (Protected)
router.get("/user", verifyToken, getUserDetails);

// Get user appointments (Protected)
router.get("/appointments", verifyToken, getUserAppointments);

module.exports = router;
