const Doctor = require("../models/Doctor");

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors" });
  }
};

// Add a new doctor
const addDoctor = async (req, res) => {
  try {
    const { name, specialty, experience, contact } = req.body;
    const newDoctor = new Doctor({ name, specialty, experience, contact });
    await newDoctor.save();
    res
      .status(201)
      .json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ error: "Error adding doctor" });
  }
};

module.exports = { getDoctors, addDoctor };
