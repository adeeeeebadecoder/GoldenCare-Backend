// const User = require("../models/userModel");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// // const { validationResult } = require("express-validator");

// // Function to generate JWT Token
// const generateAccessToken = (user) => {
//   return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//     expiresIn: "10d",
//   });
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "7d",
//   });
// };

// //Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ✅ User Signup
// // const signup = async (req, res) => {
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty()) {
// //     return res.status(400).json({ errors: errors.array() });
// //   }

// //   const { name, email, password } = req.body;

// //   try {
// //     let user = await User.findOne({ email });
// //     if (user) return res.status(400).json({ message: "User already exists" });

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     user = new User({ name, email, password: hashedPassword });

// //     await user.save();

// //     // Generate Tokens
// //     const accessToken = generateAccessToken(user);
// //     const refreshToken = generateRefreshToken(user);

// //     if (!accessToken || !refreshToken) {
// //       return res.status(500).json({ message: "Error generating tokens" });
// //     }

// //     // Set refresh token in a cookie
// //     // res.cookie("refreshToken", refreshToken, {
// //     //   httpOnly: true,
// //     //   secure: true,
// //     //   sameSite: "Lax",
// //     // });
// //     res.cookie("refreshToken", refreshToken, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "Strict",
// //       path: "/api/auth/refresh-token",
// //     });

// //     res.status(201).json({
// //       message: "User registered successfully",
// //       accessToken,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //       },
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // controllers/authController.js

// const signup = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   console.log(req.body);

//   try {
//     // check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     const accessToken = generateAccessToken(newUser);

//     res.status(201).json({
//       user: {
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//       },
//       accessToken,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // ✅ User Login

// // const login = async (req, res) => {
// //   const { email, password, role } = req.body;

// //   try {
// //     const user = await User.findOne({ email, role });
// //     if (!user) {
// //       return res
// //         .status(400)
// //         .json({ message: "User not found or role mismatch" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid password" });
// //     }

// //     // const accessToken = jwt.sign(
// //     //   { id: user._id, role: user.role },
// //     //   process.env.JWT_SECRET,
// //     //   { expiresIn: "1h" }
// //     // );

// //     const accessToken = generateAccessToken(user);

// //     res.json({
// //       accessToken,
// //       user: {
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Login error:", error);
// //     res.status(500).json({ message: "Server error during login" });
// //   }
// // };

// const login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const user = await User.findOne({ email, role });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User not found or role mismatch" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const accessToken = generateAccessToken(user);
//     res.json({
//       accessToken,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// // ✅ Refresh Token Handler
// // const refreshToken = (req, res) => {
// //   const { refreshToken } = req.cookies;
// //   if (!refreshToken)
// //     return res.status(401).json({ message: "No refresh token provided" });

// //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
// //     if (err) return res.status(403).json({ message: "Invalid refresh token" });

// //     const accessToken = generateAccessToken({
// //       id: decoded.id,
// //       role: decoded.role,
// //     });
// //     res.json({ accessToken });
// //   });
// // };

// // GET /api/auth/refresh-token
// const refreshToken = asyncHandler(async (req, res) => {
//   // Get the refresh token from cookies
//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) {
//     return res.status(401).json({ message: "No refresh token found" });
//   }

//   try {
//     // Verify the refresh token
//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

//     // Find the user by the decoded ID
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate a new access token
//     const accessToken = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_ACCESS_SECRET,
//       { expiresIn: "15m" }
//     );

//     // Send back the new access token
//     res.json({ accessToken });
//   } catch (err) {
//     console.error("Refresh failed:", err.message);

//     // If refresh token is expired or invalid, prompt re-login or reauthentication
//     if (err.name === "TokenExpiredError") {
//       return res
//         .status(403)
//         .json({ message: "Refresh token expired, please login again" });
//     }

//     res.status(403).json({ message: "Invalid refresh token" });
//   }
// });

// // ✅ Forgot Password
// const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000;

//     await user.save();

//     // Send email with reset link
//     const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Password Reset Request",
//       text: `Click the link to reset your password: ${resetURL}`,
//     };

//     await transporter.sendMail(mailOptions);
//     return res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Reset Password
// const resetPassword = async (req, res) => {
//   const { newPassword, token } = req.body;
//   console.log(token);

//   console.log(newPassword);

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       // resetPasswordExpires: { $gt: Date.now() },
//     });
//     console.log(user);

//     if (!user)
//       return res.status(400).json({ message: "Invalid or expired token" });

//     if (!newPassword) {
//       return res.status(400).json({ message: "Password is required" });
//     }

//     // Hash new password
//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();
//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     // console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { signup, login, forgotPassword, resetPassword, refreshToken };

const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Function to generate JWT Token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ User Signup
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser);

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ User Login
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found or role mismatch" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    res.json({
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Refresh Token Handler
const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh failed:", err.message);

    if (err.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Refresh token expired, please login again" });
    }

    res.status(403).json({ message: "Invalid refresh token" });
  }
});

// ✅ Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Reset Password
const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login, forgotPassword, resetPassword, refreshToken };
