// backend/controllers/VerificationController.js
const transporter = require("../config/email");

// In‑memory store (for prod you’d use Redis or a table!)
const verificationCodes = {};

// 1. Generate a 6‑digit code
const generateVerificationCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.sendCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const code = generateVerificationCode();
  verificationCodes[email] = code;

  try {
    await transporter.sendMail({
      from: `"MINNANO" <${process.env.EMAIL_ADDRESS}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}.`,
    });
    res.status(200).json({ message: "Verification code sent." });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send code." });
  }
};

exports.verifyCode = (req, res) => {
  const { email, code } = req.body;
  if (verificationCodes[email] && verificationCodes[email] === code) {
    delete verificationCodes[email];
    return res.status(200).json({ message: "Email verified", verified: true });
  }
  return res.status(400).json({ message: "Invalid code", verified: false });
};
