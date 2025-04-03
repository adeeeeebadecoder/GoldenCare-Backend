const Reminder = require("../models/Reminder");
const { sendPushNotification } = require("../config/firebase");
const { sendEmailReminder } = require("../config/firebase-service-account.json");
const { scheduleReminder } = require("../utils/scheduleReminder");

const createReminder = async (req, res) => {
  try {
    const { medicineName, time, dosage, notes, deviceToken } = req.body;
    const userId = req.user.id;

    const reminder = new Reminder({
      userId,
      medicineName,
      time,
      dosage,
      notes,
      reminderMethod,
      contact,
    });

    await reminder.save();

    // Schedule push notification
    setTimeout(() => {
      sendPushNotification(
        deviceToken,
        "Medication Reminder",
        `Take ${dosage} of ${medicineName} at ${time}. Notes: ${notes}`
      );
    }, 5000);

    res.status(201).json({ message: "Reminder set successfully!", reminder });
  } catch (error) {
    res.status(500).json({ message: "Error setting reminder", error });
  }
};

module.exports = { createReminder };
