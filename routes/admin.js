const express = require("express");
const User = require("../models/User");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const sendEmail = requier("../utils/emailService");

const router = express.Router();

// Get all users (Admin only)
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete a user (Admin only)
router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(req.params.id);

        // Send email notification
        await sendEmail(
            user.email,
            "Account Deletion Notice",
            `Hello ${user.name},\n\nYour account has been deleted by an admin.\n\nRegards,\nAdmin Team`
        );

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});


// Change user role (Admin only)
router.put("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  const { role } = req.body;
  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    //send email notification
    await sendEmail(
      user.email,
      "Role Update Notificaton",
      `Hello ${user.name},\n\nYour account role has been updated to :${role}.\n\nRegards,\nAdmin Team`
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user role" });
  }
});

module.exports = router;
