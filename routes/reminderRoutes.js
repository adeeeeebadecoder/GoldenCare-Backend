const express = require("express");
const { createReminder } = require("../controllers/reminderController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", protect, createReminder);

module.exports = router;
