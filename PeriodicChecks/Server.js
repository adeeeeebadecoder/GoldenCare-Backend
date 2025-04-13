const cron = require("node-cron");
const Reminder = require("../models/Reminder");
const { sendEmail } = require("../utils/emailService");

// Cron job to check reminders every minute
cron.schedule("* * * * *", async () => {
  try {
    const reminders = await Reminder.find();

    reminders.forEach(async (reminder) => {
      // Check and update the reminder status, and send an email if necessary
      const updatedReminder = await checkReminderStatus(reminder);
      await updatedReminder.save(); // Save the updated status
    });

    console.log("Reminder statuses checked and emails sent if applicable.");
  } catch (err) {
    console.error("Error checking reminder statuses:", err);
  }
});
