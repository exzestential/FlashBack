// controllers/deckController.js

const db = require("../config/db");

const getDecks = async (req, res) => {
  const userId = req.user.userId;

  try {
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
         GROUP BY decks.deck_id, folders.color`,
      [userId]
    );

    res.json(decks);
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error fetching decks" });
  }
};

const createDeck = async (req, res) => {
  const { title, folder_id } = req.body;
  const userId = req.user.userId;

  if (!title || !folder_id) {
    return res
      .status(400)
      .json({ message: "Title and folder id are required" });
  }

  try {
    // Insert new deck into the database
    const [result] = await db.query(
      `INSERT INTO decks (title, folder_id, user_id, last_modified)
           VALUES (?, ?, ?, NOW())`,
      [title, folder_id, userId]
    );

    // Respond with the newly created deck
    res.status(201).json({
      message: "Deck created successfully",
      deck: {
        deck_id: result.insertId,
        title,
        folder_id: folder_id,
        user_id: userId,
      },
    });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Failed to create deck" });
  }
};

module.exports = { getDecks, createDeck };
