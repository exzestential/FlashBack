// routes/studyRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Adjust path to your database connection
const { authenticateToken } = require("../middleware/authMiddleware"); // Your authentication middleware

// Get cards for study/review (similar to your existing getCards but organized for study)
router.get("/study/:deckId", authenticateToken, async (req, res) => {
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
      WHERE decks.user_id = ? AND cards.deck_id = ?
      ORDER BY RAND()`, // Simple randomization for study
      [userId, deckId]
    );

    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cards for study" });
  }
});

// Submit a review for a card
router.post("/review", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { cardId, deckId, rating } = req.body;

  // Validate rating (should be "again", "hard", or "easy")
  const validRatings = ["again", "hard", "easy"];
  if (!validRatings.includes(rating.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Invalid rating. Use 'again', 'hard', or 'easy'" });
  }

  try {
    // Insert the review into the database
    const [result] = await db.query(
      `INSERT INTO reviews (user_id, card_id, deck_id, rating) 
       VALUES (?, ?, ?, ?)`,
      [userId, cardId, deckId, rating.toLowerCase()]
    );

    // Return the inserted review with its ID and timestamp
    if (result.insertId) {
      const [reviewData] = await db.query(
        `SELECT * FROM reviews WHERE review_id = ?`,
        [result.insertId]
      );

      res.status(201).json({
        message: "Review recorded successfully",
        review: reviewData[0],
      });
    } else {
      res.status(500).json({ message: "Failed to record review" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to record review" });
  }
});

// Get review statistics for a deck
router.get("/stats/:deckId", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { deckId } = req.params;

  try {
    // Get review counts by rating
    const [stats] = await db.query(
      `SELECT 
        rating, 
        COUNT(*) as count,
        MAX(timestamp) as last_reviewed
      FROM reviews 
      WHERE user_id = ? AND deck_id = ? 
      GROUP BY rating`,
      [userId, deckId]
    );

    // Get total cards reviewed
    const [totalReviewed] = await db.query(
      `SELECT COUNT(DISTINCT card_id) as unique_cards_reviewed
       FROM reviews
       WHERE user_id = ? AND deck_id = ?`,
      [userId, deckId]
    );

    res.status(200).json({
      reviewStats: stats,
      uniqueCardsReviewed: totalReviewed[0].unique_cards_reviewed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get review statistics" });
  }
});

module.exports = router;
