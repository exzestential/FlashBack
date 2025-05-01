const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const deckRoutes = require("./routes/deckRoutes");
const folderRoutes = require("./routes/folderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(
    "Headers:",
    req.headers.authorization
      ? "Authorization: [PRESENT]"
      : "Authorization: [NONE]"
  );
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", healthRoutes);
app.use("/api", deckRoutes);
app.use("/api", folderRoutes);

// Root endpoint for testing
app.get("/", (req, res) => {
  res.send("API is running. Use /api endpoints to access the API.");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
