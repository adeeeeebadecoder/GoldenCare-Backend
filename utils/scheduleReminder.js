const cron = require("node-cron");
const { sendPushNotification } = require("../config/firebase");
const { sendEmailReminder } = require("../config/firebase");
const Reminder = require("../models/Reminder");

const scheduleReminder = async (reminder) => {
  const { time, reminderMethod, contact, medicineName, dosage, notes } =
    reminder;

  const [hour, minute] = time.split(":");
  const cronTime = `${minute} ${hour} * * *`; // Runs every day at the specified time

  cron.schedule(cronTime, async () => {
    console.log(`Sending reminder for ${medicineName}`);

    if (reminderMethod === "Push") {
      await sendPushNotification(
        contact,
        "Medication Reminder",
        `Take ${dosage} of ${medicineName}. Notes: ${notes}`
      );
    } else if (reminderMethod === "Email") {
      await sendEmailReminder(
        contact,
        "Medication Reminder",
        `Take ${dosage} of ${medicineName}. Notes: ${notes}`
      );
    }
  });

  console.log(`Reminder scheduled at ${time} for ${medicineName}`);
};

module.exports = { scheduleReminder };
