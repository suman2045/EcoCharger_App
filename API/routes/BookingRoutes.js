const express = require('express');
const router = express.Router();

// Example route handler
router.get("/bookings", async (req, res) => {
  try {
    // Logic to fetch bookings
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
