// const Reminder = require("../models/Reminder");

// // GET all reminders
// exports.getReminders = async (req, res) => {
//   try {
//     const reminders = await Reminder.find();
//     res.json(reminders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST new reminder
// exports.createReminder = async (req, res) => {
//   const reminder = new Reminder(req.body);
//   try {
//     const newReminder = await reminder.save();
//     res.status(201).json(newReminder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // PUT update status
// exports.toggleReminderStatus = async (req, res) => {
//   try {
//     const reminder = await Reminder.findById(req.params.id);
//     if (!reminder)
//       return res.status(404).json({ message: "Reminder not found" });

//     reminder.status = reminder.status === "active" ? "inactive" : "active";
//     await reminder.save();

//     res.json(reminder);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE a reminder
// exports.deleteReminder = async (req, res) => {
//   try {
//     const reminder = await Reminder.findById(req.params.id);
//     if (!reminder) {
//       return res.status(404).json({ message: "Reminder not found" });
//     }

//     await reminder.deleteOne();
//     res.json({ message: "Reminder deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Reminder = require("../models/Reminder");
const { sendEmail } = require("../utils/emailService");
const { sendPushNotification } = require("../utils/fcmService");

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    console.log(req.body);
    const {
      time,
      medicineName,
      dosage,
      frequency,
      reminderMethod,
      date,
      status,
    } = req.body;

    const reminder = new Reminder({
      medicineName,
      time,
      dosage,
      frequency,
      reminderMethod,
      date,
      status,
      userId: req.user._id,
    });

    const userMail = req.user.email;

    const savedReminder = await reminder.save();

    // Send email if reminderMethod includes "email"
    if (savedReminder.reminderMethod.includes("Email")) {
      await sendEmail(
        userMail,
        "Medication Reminder",
        `Hi! Don't forget to take ${savedReminder.medicineName} (${savedReminder.dosage}) at ${savedReminder.time}.`
      );
    }

    // Send push notification if method includes "push" and FCM token is available
    if (savedReminder.reminderMethod.includes("push") && req.body.fcmToken) {
      await sendPushNotification(
        req.body.fcmToken,
        "Medication Reminder",
        `Take ${savedReminder.medicineName} at ${savedReminder.time}`
      );
    }
    console.log(savedReminder);

    res.status(201).json(savedReminder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({}); 
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a reminder
exports.updateReminder = async (req, res) => {
  try {
    const updated = await Reminder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Reminder not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const deleted = await Reminder.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Reminder not found" });
    res.json({ message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle status (active/inactive)
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
