const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getCards,
  createCard,
  updateCard,
} = require("../controllers/cardController");

const router = express.Router();

// Get all cards for a specific deck
router.get("/decks/:deckId", authenticateToken, getCards);
router.post("/cards", authenticateToken, createCard);
router.put("/cards/:cardId", authenticateToken, updateCard);

module.exports = router;
