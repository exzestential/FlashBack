const express = require("express");
const router = express.Router();

// Simple health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running",
    timestamp: new Date().toISOString(),
    serverTime: new Date().toLocaleString(),
  });
});

// Test authentication endpoint
router.get("/auth-test", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(200).json({
      status: "unauthenticated",
      message: "No Authorization header found",
      auth: false,
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(200).json({
      status: "malformed",
      message: "Authorization header does not contain a valid token",
      auth: false,
    });
  }

  return res.status(200).json({
    status: "received",
    message: "Authorization header found",
    authHeader: authHeader,
    tokenReceived: true,
    tokenPrefix: token.substring(0, 10) + "...",
    auth: true,
  });
});

module.exports = router;
