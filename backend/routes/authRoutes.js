// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/authController");
const {
  sendCode,
  verifyCode,
} = require("../controllers/verificationController");

router.post("/signup", AuthCtrl.signup);

router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);

module.exports = router;
