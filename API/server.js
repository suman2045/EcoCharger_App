// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const stationRoutes = require("./routes/StationRoutes");
const bookingRoutes =require("./routes/BookingRoutes")

dotenv.config();

const app = express();

// ✅ Allow all cross-origin requests (from mobile, browser, etc.)
app.use(cors());

// ✅ Parse incoming JSON bodies
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);

// ✅ Basic test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "API is reachable ✅" });
});


app.use('/bookings', bookingRoutes);


// ✅ Start server on IP-accessible port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
