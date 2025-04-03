const express = require("express");
const { getClinics, addClinic } = require("../controllers/clinicController");

const router = express.Router();

router.get("/", getClinics); // Get all clinics
router.post("/", addClinic); // Add a new clinic

module.exports = router;
