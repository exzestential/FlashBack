const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  console.log("🔑 Running authentication middleware");

  // Log headers for debugging
  console.log("Auth header:", req.headers.authorization || "None");
  console.log("Cookies present:", req.cookies ? "Yes" : "No");

  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    console.log("Token found in Authorization header");
  }

  // If no token in header, check cookies as fallback
  if (!token && req.cookies && req.cookies.session_token) {
    token = req.cookies.session_token;
    console.log("Token found in cookies");
  }

  if (!token) {
    console.log("❌ No token found - authentication failed");
    return res.status(401).json({
      message: "Authentication required",
      details: "No authentication token found in request",
    });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("✅ Token verified successfully");
    console.log("User ID from token:", decoded.userId);

    // Attach the decoded user info to the request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token verification error:", err.message);

    // Handle different JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Authentication expired",
        details: "Your session has expired, please log in again",
      });
    }

    return res.status(403).json({
      message: "Invalid authentication",
      details: "Your authentication token is invalid",
    });
  }
};

module.exports = { authenticateToken };
