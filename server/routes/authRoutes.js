const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Authentication routes
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

// Email verification routes
router.post("/check-email", authController.checkEmail);
router.post("/check-username", authController.checkUsername);
router.post("/send-verification", authController.sendVerificationCode);
router.post("/resend-verification", authController.resendVerificationCode);
router.post("/verify-code", authController.verifyCode);

// Session check route (protected)
router.get("/check-session", authenticateToken, authController.checkSession);

module.exports = router;
