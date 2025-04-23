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

const SECRET_KEY = "your_secret_key"; // or use process.env.SECRET_KEY

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

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect Email or Password." });
    }

    const sessionToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .cookie("session_token", sessionToken, { httpOnly: true })
      .status(200)
      .json({ message: "Logged in successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const signup = async (req, res) => {
  const { userType, username, email, password, interests } = req.body;
  const interestString = JSON.stringify(interests);

  try {
    const query = `
      INSERT INTO users (userType, username, email, password, interests)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [userType, username, email, password, interestString];

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
  sendVerificationCode,
  resendVerificationCode,
  verifyCode,
  checkEmail,
  signup,
};
