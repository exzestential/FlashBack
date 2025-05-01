const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verification code storage (should be moved to a database in production)
const verificationCodes = {};

const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(200).json({ registered: true });
    } else {
      return res.status(200).json({ registered: false });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: err.message });
  }
};

const checkUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length > 0) {
      return res.status(200).json({ registered: true });
    } else {
      return res.status(200).json({ registered: false });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: err.message });
  }
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const code = generateVerificationCode();
    verificationCodes[email] = code;

    await transporter.sendMail({
      from: `"FlashBack" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}. Please enter this code to verify your email.`,
    });

    res.status(200).send("Verification code sent!");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send verification code.");
  }
};

const resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const code = generateVerificationCode();
    verificationCodes[email] = code;

    await transporter.sendMail({
      from: `"FlashBack" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}. Please enter this code to verify your email.`,
    });

    res.status(200).send("Verification code sent!");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send verification code.");
  }
};

const verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] === code) {
    delete verificationCodes[email];
    return res.status(200).json({ message: "Email verified", verified: true });
  }
  return res.status(400).json({
    message: "Invalid verification code.",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const user = rows[0];

    // Compare the hashed password with the input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    // If passwords match, generate the token
    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "12h",
      }
    );

    // Send the session token as both a cookie and in the response body
    res
      .cookie("session_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in production with HTTPS
        sameSite: "strict",
        maxAge: 43200000, // 12 hours
      })
      .status(200)
      .json({
        message: "Logged in successfully!",
        token,
        userId: user.user_id,
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const checkSession = (req, res) => {
  // At this point, req.user has been set by the authenticateToken middleware
  res.status(200).json({
    message: "Session valid",
    userId: req.user.userId,
  });
};

const logout = (req, res) => {
  res
    .clearCookie("session_token")
    .status(200)
    .json({ message: "Logged out successfully" });
};

const register = async (req, res) => {
  const { user_type, username, email, password, interests } = req.body;
  const interestString = JSON.stringify(interests);

  try {
    // Check if user already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is a safe default saltRounds

    const query = `
      INSERT INTO users (user_type, username, email, password, interests)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [user_type, username, email, hashedPassword, interestString];

    await pool.query(query, values);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({ message: "Server error. Please try signing up again" });
  }
};

module.exports = {
  login,
  checkSession,
  logout,
  sendVerificationCode,
  resendVerificationCode,
  verifyCode,
  checkEmail,
  checkUsername,
  register,
};
