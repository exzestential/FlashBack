const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const pool = require("../config/db");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const verificationCodes = {};

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
    message: `Invalid verification code.`,
    //receivedCode: code, // Add received code in the response for debugging
    //expectedCode: verificationCodes[email], // Add expected code in the response for comparison
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Incorrect Email or Password." });
    }

    const user = rows[0];

    // Compare the hashed password with the input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Email or Password." });
    }

    // If passwords match, generate the token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send the session token as a cookie
    res
      .cookie("session_token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ message: "Logged in successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const checkSession = async (req, res) => {
  const token = req.cookies.session_token;
  if (!token) {
    return res.status(401).json({ message: "No session token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      decoded.userId,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid session." });
    }

    res.status(200).json({ message: "Session is valid.", user: rows[0] });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired session token." });
  }
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
  register,
};
