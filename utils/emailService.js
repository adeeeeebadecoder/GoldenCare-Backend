// // const nodemailer = require("nodemailer");
// // require("dotenv").config();

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // const sendEmail = async (email, subject, message) => {
// //   // console.log("das", to, subject);
// //    console.log("Sending email to:", email, "with subject:", subject);

// //   try {
// //     await transporter.sendMail({
// //       from: process.env.EMAIL,
// //       to: email,
// //       subject,
// //       text: message,
// //     });
// //     // console.log(`Email sent to ${to}`);
// //     console.log(`Email sent to ${email}`);
// //   } catch (error) {
// //     console.error("Error sending email:", error);
// //   }
// // };

// // module.exports = { sendEmail };

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async (to, subject, message) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to,
//       subject,
//       text: message,
//     });
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// module.exports = { sendEmail };

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text: message,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = { sendEmail };
