// const Reminder = require("../models/Reminder");
// const { sendPushNotification } = require("../config/firebase");
// const { sendEmailReminder } = require("../config/firebase");
// const { scheduleReminder } = require("../utils/scheduleReminder");

// const createReminder = async (req, res) => {
//   try {
//     const { medicineName, time, dosage, notes, deviceToken } = req.body;
//     const userId = req.user.id;

//     const reminder = new Reminder({
//       userId,
//       medicineName,
//       time,
//       dosage,
//       notes,
//       reminderMethod,
//       contact,
//     });

//     await reminder.save();

//     // Schedule push notification
//     setTimeout(() => {
//       sendPushNotification(
//         deviceToken,
//         "Medication Reminder",
//         `Take ${dosage} of ${medicineName} at ${time}. Notes: ${notes}`
//       );
//     }, 5000);

//     res.status(201).json({ message: "Reminder set successfully!", reminder });
//   } catch (error) {
//     res.status(500).json({ message: "Error setting reminder", error });
//   }
// };

// module.exports = { createReminder };
const Reminder = require("../models/Reminder");

// GET all reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new reminder
exports.createReminder = async (req, res) => {
  const reminder = new Reminder(req.body);
  try {
    const newReminder = await reminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update status
exports.toggleReminderStatus = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder)
      return res.status(404).json({ message: "Reminder not found" });

    reminder.status = reminder.status === "active" ? "inactive" : "active";
    await reminder.save();

    res.json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    await reminder.deleteOne();
    res.json({ message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
