const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const db = require("../config/db"); // Your DB connection (e.g. using pg, mysql2, or Sequelize)

router.get("/folders", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Join decks with folders to get the color of the folder associated with each deck
    const [folders] = await db.query(
      `SELECT * FROM folders WHERE folders.user_id = ?`,
      [userId]
    );

    res.json(folders);
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error fetching folders" });
  }
});

module.exports = router;
