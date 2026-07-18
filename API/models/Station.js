// models/Station.js
const mongoose = require("mongoose");//package

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  available: { type: Boolean, default: true },
  price: { type: Number, required: true }, // <-- added
  vehicleType: { type: String, required: true }, // <-- added
});

module.exports = mongoose.model("Station", stationSchema);
