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
          decks.folder_id,
          COUNT(cards.card_id) AS card_count,
          folders.color AS folder_color
        FROM decks
        LEFT JOIN cards ON cards.deck_id = decks.deck_id
        LEFT JOIN folders ON folders.folder_id = decks.folder_id
        WHERE decks.user_id = ? AND decks.is_deleted = 0
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
  const { title, folder_id, description } = req.body;
  const userId = req.user.userId;

  if (!title || !folder_id) {
    return res
      .status(400)
      .json({ message: "Title and folder id are required" });
  }

  try {
    // Insert new deck into the database
    const [result] = await db.query(
      `INSERT INTO decks (title, description, folder_id, user_id, last_modified)
           VALUES (?, ?, ?, ?, NOW())`,
      [title, description || null, folder_id, userId]
    );

    // Respond with the newly created deck
    res.status(201).json({
      message: "Deck created successfully",
      deck: {
        deck_id: result.insertId,
        title,
        description: description || null,
        folder_id: folder_id,
        user_id: userId,
      },
    });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Failed to create deck" });
  }
};

const updateDeck = async (req, res) => {
  const { deckId } = req.params;
  const { title, description, folder_id } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    // First check if the deck exists and belongs to the user
    const [deck] = await db.query(
      `SELECT deck_id FROM decks 
       WHERE deck_id = ? AND user_id = ?`,
      [deckId, userId]
    );

    if (deck.length === 0) {
      return res
        .status(404)
        .json({ message: "Deck not found or unauthorized" });
    }

    // If folder_id is provided, validate it belongs to the user
    if (folder_id) {
      const [folder] = await db.query(
        `SELECT folder_id FROM folders 
         WHERE folder_id = ? AND user_id = ?`,
        [folder_id, userId]
      );

      if (folder.length === 0) {
        return res
          .status(400)
          .json({ message: "Folder not found or unauthorized" });
      }
    }

    // Update the deck
    const [result] = await db.query(
      `UPDATE decks 
       SET title = ?, description = ?, folder_id = ?, last_modified = NOW() 
       WHERE deck_id = ? AND user_id = ?`,
      [
        title,
        description || null,
        folder_id || null, // Allow removing from folder by setting to null
        deckId,
        userId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Failed to update deck" });
    }

    // Get the updated deck to return
    const [updatedDeck] = await db.query(
      `SELECT
        decks.deck_id,
        decks.title,
        decks.description,
        decks.last_modified,
        decks.folder_id,
        folders.color AS folder_color,
        folders.name AS folder_name
      FROM decks
      LEFT JOIN folders ON folders.folder_id = decks.folder_id
      WHERE decks.deck_id = ?`,
      [deckId]
    );

    res.json({
      message: "Deck updated successfully",
      deck: updatedDeck[0],
    });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error updating deck" });
  }
};

const deleteDeck = async (req, res) => {
  const { deckId } = req.params;
  const userId = req.user.userId;

  try {
    // First check if the deck exists and belongs to the user
    const [deck] = await db.query(
      `SELECT deck_id FROM decks 
       WHERE deck_id = ? AND user_id = ? AND is_deleted = 0`,
      [deckId, userId]
    );

    if (deck.length === 0) {
      return res
        .status(404)
        .json({ message: "Deck not found or unauthorized" });
    }

    const [result] = await db.query(
      `DELETE FROM decks
      WHERE deck_id = ?`,
      [deckId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Failed to delete deck" });
    }

    res.json({ message: "Deck deleted successfully" });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error deleting deck" });
  }
};

module.exports = { getDecks, createDeck, updateDeck, deleteDeck };
