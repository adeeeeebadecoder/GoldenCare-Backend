// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getAllMessages,
} = require("../controllers/contactController");
const {
  protect,
  authorizeRoles,
  authenticateUser,
} = require("../middlewares/authMiddleware");

router.post("/", createContactMessage);

// Only admin or doctor should access this
router.get(
  "/",
  protect,
  authenticateUser,
  authorizeRoles("admin", "doctor"),
  getAllMessages
);

module.exports = router;
