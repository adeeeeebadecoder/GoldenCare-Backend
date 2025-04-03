const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("../models/Doctor");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const doctors = [
      {
        name: "Dr. John Smith",
        specialty: "Cardiologist",
        experience: 12,
        contact: "555-1234",
      },
      {
        name: "Dr. Jane Doe",
        specialty: "Neurologist",
        experience: 8,
        contact: "555-5678",
      },
      {
        name: "Dr. Mark Brown",
        specialty: "Pediatrician",
        experience: 10,
        contact: "555-9012",
      },
    ];

    await Doctor.insertMany(doctors);
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
