const db = require("../config/db");

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

module.exports = { getCards };
