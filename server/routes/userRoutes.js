const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Route to get all users (public or admin-only)
router.get("/users", userController.getUsers);

// User home page data - protected by authentication
router.get("/user/home/:userId", authenticateToken, userController.getUserHome);

module.exports = router;
