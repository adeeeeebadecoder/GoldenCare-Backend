require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const contactRoutes = require("./routes/contactRoutes");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/ap/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoute);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => res.send("API is running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
