// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const { auth } = require("../middelwares/authMiddelware"); // Ensure this is imported correctly

const router = express.Router();

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Profile routes
router.get("/profile", auth, authController.getProfile);//route for profile
router.put("/profile", auth, authController.updateProfile);  // Route for updating profile

module.exports = router;
