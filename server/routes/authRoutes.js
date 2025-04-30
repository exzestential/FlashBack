const express = require("express");
const router = express.Router();
const {
  login,
  checkSession,
  logout,
  sendVerificationCode,
  resendVerificationCode,
  verifyCode,
  checkEmail,
  register,
} = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

router.post("/login", login);

router.post("/send-code", sendVerificationCode);
router.post("/resend-code", resendVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/register", register);

router.post("/check-email", checkEmail);

router.get("/check-session", authenticate, checkSession);

module.exports = router;
