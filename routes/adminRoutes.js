const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/adminController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all users (Admin only)
router.get("/users", verifyToken, verifyRole("admin"), getAllUsers);

// Delete a user (Admin only)
router.delete("/users/:id", verifyToken, verifyRole("admin"), deleteUser);

// Update user role (Admin only)
router.put("/users/:id", verifyToken, verifyRole("admin"), updateUserRole);

module.exports = router;
