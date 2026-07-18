const Station = require("../models/Station");

// Get all stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stations", error: error.message });
  }
};

// Get single station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: "Error fetching station", error: error.message });
  }
};

// Create station
exports.createStation = async (req, res) => {
  try {
    const { name, address, available = true, price, vehicleType } = req.body;

    // Validate required fields
    if (!name || !address || price == null || !vehicleType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const station = await Station.create({
      name,
      address,
      available,
      price,
      vehicleType
    });

    res.status(201).json(station);
  } catch (error) {
    res.status(400).json({ message: "Failed to create station", error: error.message });
  }
};

// Update station (e.g., availability, price, etc.)
exports.updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: "Failed to update station", error: error.message });
  }
};

// Delete station
exports.deleteStation = async (req, res) => {
  try {
    const deleted = await Station.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.json({ message: "Station deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete station", error: error.message });
  }
};
