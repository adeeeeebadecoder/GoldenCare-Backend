const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, subject, message) => {
  console.log("das", to, subject);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text: message,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
