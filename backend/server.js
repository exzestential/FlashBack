// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const verificationRoutes = require("./routes/verificationRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", verificationRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
