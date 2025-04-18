const express = require("express");
const router = express.Router();
const {
  login,
  sendVerificationCode,
  resendVerificationCode,
  verifyCode,
  checkEmail,
} = require("../controllers/authController");

router.post("/login", login);

router.post("/send-code", sendVerificationCode);
router.post("/resend-code", resendVerificationCode);
router.post("/verify-code", verifyCode);

router.post("/check-email", checkEmail);

module.exports = router;
