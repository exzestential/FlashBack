// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
