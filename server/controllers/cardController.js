const db = require("../config/db"); // Adjust path to your database connection

const getCards = async (req, res) => {
  const userId = req.user.userId;
  const { deckId } = req.params;

  try {
    const [cards] = await db.query(
      `SELECT
                cards.card_id,
                cards.deck_id,
                cards.front_content,
                cards.back_content,
                cards.front_image_url,
                cards.back_image_url,
                cards.last_modified,
                decks.title as deck_name,
                folders.color as folder_color
            FROM cards
            JOIN decks ON cards.deck_id = decks.deck_id
            JOIN folders ON decks.folder_id = folders.folder_id
            WHERE decks.user_id = ? AND cards.deck_id = ?`,
      [userId, deckId]
    );

    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to get cards" });
  }
};

const createCard = async (req, res) => {
  const userId = req.user.userId;
  const {
    deck_id,
    front_content,
    back_content,
    front_image_url = null,
    back_image_url = null,
    notes = null,
  } = req.body;

  try {
    // Verify that the deck belongs to the user
    const [deckCheck] = await db.query(
      "SELECT deck_id FROM decks WHERE deck_id = ? AND user_id = ?",
      [deck_id, userId]
    );

    if (deckCheck.length === 0) {
      return res.status(403).json({
        message: "You don't have permission to add cards to this deck",
      });
    }

    // Get the current position for the new card
    const [positions] = await db.query(
      "SELECT MAX(position) as max_position FROM cards WHERE deck_id = ?",
      [deck_id]
    );

    const nextPosition =
      positions[0].max_position !== null ? positions[0].max_position + 1 : 0;

    // Insert the new card
    const [result] = await db.query(
      `INSERT INTO cards 
        (deck_id, front_content, back_content, front_image_url, back_image_url, notes, position) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        deck_id,
        front_content,
        back_content,
        front_image_url,
        back_image_url,
        notes,
        nextPosition,
      ]
    );

    const cardId = result.insertId;

    // Return the created card
    const [newCard] = await db.query(
      `SELECT 
        card_id, deck_id, front_content, back_content, 
        front_image_url, back_image_url, notes, position, 
        created_at, last_modified
       FROM cards WHERE card_id = ?`,
      [cardId]
    );

    res.status(201).json(newCard[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create card" });
  }
};

const updateCard = async (req, res) => {
  const userId = req.user.userId;
  const { cardId } = req.params;
  const {
    front_content,
    back_content,
    front_image_url,
    back_image_url,
    notes,
  } = req.body;

  try {
    // Verify the card belongs to the user
    const [cardCheck] = await db.query(
      `SELECT cards.card_id FROM cards 
       JOIN decks ON cards.deck_id = decks.deck_id 
       WHERE cards.card_id = ? AND decks.user_id = ?`,
      [cardId, userId]
    );

    if (cardCheck.length === 0) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update this card" });
    }

    // Update the card
    const updateFields = [];
    const updateValues = [];

    if (front_content !== undefined) {
      updateFields.push("front_content = ?");
      updateValues.push(front_content);
    }

    if (back_content !== undefined) {
      updateFields.push("back_content = ?");
      updateValues.push(back_content);
    }

    if (front_image_url !== undefined) {
      updateFields.push("front_image_url = ?");
      updateValues.push(front_image_url);
    }

    if (back_image_url !== undefined) {
      updateFields.push("back_image_url = ?");
      updateValues.push(back_image_url);
    }

    if (notes !== undefined) {
      updateFields.push("notes = ?");
      updateValues.push(notes);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Add card ID to values
    updateValues.push(cardId);

    await db.query(
      `UPDATE cards SET ${updateFields.join(", ")} WHERE card_id = ?`,
      updateValues
    );

    // Get the updated card
    const [updatedCard] = await db.query(
      `SELECT 
        card_id, deck_id, front_content, back_content, 
        front_image_url, back_image_url, notes, position, 
        created_at, last_modified
       FROM cards WHERE card_id = ?`,
      [cardId]
    );

    res.status(200).json(updatedCard[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update card" });
  }
};

module.exports = {
  getCards,
  createCard,
  updateCard,
};
