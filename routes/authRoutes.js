const express = require("express");
const { body } = require("express-validator");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
} = require("../controllers/authController");

const router = express.Router();

// ✅ User Signup
router.post(
  "/signup",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Valid email required").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  signup
);

// ✅ User Login
router.post(
  "/login",
  [
    body("email", "Valid email required").isEmail(),
    body("password", "Password is required").notEmpty(),
  ],
  login
);

// ✅ Forgot Password
router.post("/forgot-password", forgotPassword);

// ✅ Reset Password
router.post("/reset-password/:token", resetPassword);

// ✅ Refresh Token
router.post("/refresh-token", refreshToken);

module.exports = router;
