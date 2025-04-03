const Clinic = require("../models/Clinic");

// Get all clinics
const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find(); 
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ error: "Error fetching clinics" });
  }
};

// Add a new clinic
const addClinic = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const newClinic = new Clinic({ name, address, phone });
    await newClinic.save();
    res
      .status(201)
      .json({ message: "Clinic added successfully", clinic: newClinic });
  } catch (error) {
    res.status(500).json({ error: "Error adding clinic" });
  }
};

module.exports = { getClinics, addClinic };
