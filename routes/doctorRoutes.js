const express = require("express");
const { getDoctors, addDoctor } = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getDoctors); // Get all doctors
router.post("/", addDoctor); // Add a new doctor

module.exports = router;
``