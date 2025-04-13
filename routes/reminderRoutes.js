// // const express = require("express");
// // const { createReminder } = require("../controllers/reminderController");
// // const { protect } = require("../middlewares/authMiddleware");

// // const router = express.Router();

// // router.post("/create", protect, createReminder);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Reminder = require("../models/Reminder");

// // Set Reminder (Admin Only)
// router.post("/", async (req, res) => {
//   const { role, medicineName, time, dosage, notes, reminderMethod, createdBy } =
//     req.body;

//   if (role !== "admin") {
//     return res.status(403).json({ message: "Only admins can set reminders" });
//   }

//   const newReminder = new Reminder({
//     medicineName,
//     time,
//     dosage,
//     notes,
//     reminderMethod,
//     createdBy,
//   });

//   try {
//     const saved = await newReminder.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// });

// module.exports = router;

const express = require("express");
const {
  getReminders,
  createReminder,
  toggleReminderStatus,
  deleteReminder,
} = require("../controllers/reminderController");
const router = express.Router();

router.get("/", getReminders);
router.post("/", createReminder);
router.put("/:id/toggle", toggleReminderStatus);
router.delete("/:id", deleteReminder);

module.exports = router;
