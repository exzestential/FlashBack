// backend/controllers/userController.js

const pool = require("../config/db");

// Existing controller
exports.getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Updated getUserHome function
exports.getUserHome = async (req, res) => {
  const userId = req.params.userId; // Access userId from request parameters

  try {
    // Using the pool's promise-based query method
    const [rows] = await pool.query(
      "SELECT user_id, user_type, username, email, interests FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse interests if it's stored as a JSON string
    const userData = rows[0];
    if (userData.interests && typeof userData.interests === "string") {
      try {
        userData.interests = JSON.parse(userData.interests);
      } catch (e) {
        console.error("Error parsing interests:", e);
      }
    }

    // Return the user data
    res.status(200).json({ user: userData });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: err.message });
  }
};
