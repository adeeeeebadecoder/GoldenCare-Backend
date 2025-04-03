import nodemailer from "nodemailer";

const sendResetEmail = async (email, token) => {
  
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  await transporter.sendMail({
    from: '"Support Team" <support@example.com>',
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};

export default sendResetEmail;
