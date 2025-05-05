const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getCards,
  getSingleCard,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

// Get all cards in a deck
router.get("/decks/:deckId", authenticateToken, getCards);

// Get a specific card
router.get("/cards/:cardId", authenticateToken, getSingleCard);

// Create a new card
router.post("/cards", authenticateToken, createCard);

// Update a card
router.put("/cards/:cardId", authenticateToken, updateCard);

// Delete a card
router.delete("/cards/:cardId", authenticateToken, deleteCard);

module.exports = router;
