const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const db = require("../config/db"); // Your DB connection (e.g. using pg, mysql2, or Sequelize)

router.get("/decks", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Join decks with folders to get the color of the folder associated with each deck
    const [decks] = await db.query(
      `SELECT 
           decks.deck_id, 
           decks.title, 
           decks.description,
           decks.last_modified,
           COUNT(cards.card_id) AS card_count,
           folders.color AS folder_color
         FROM decks
         LEFT JOIN cards ON cards.deck_id = decks.deck_id
         LEFT JOIN folders ON folders.folder_id = decks.folder_id
         WHERE decks.user_id = ?
         GROUP BY decks.deck_id, folders.color`, // Group by folder color too
      [userId]
    );

    res.json(decks);
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error fetching decks" });
  }
});

module.exports = router;
