const express = require("express");
const router = express.Router();
const { auth } = require("../middelwares/authMiddelware");
const {
  getAllStations,
  createStation,
  deleteStation,
  getStationById,
  updateStation
} = require("../controllers/stationControllers");

router.get("/", auth, getAllStations);
router.get("/:id", auth, getStationById);
router.post("/", auth, createStation);
router.put("/:id", auth, updateStation);
router.delete("/:id", auth, deleteStation);

module.exports = router;
