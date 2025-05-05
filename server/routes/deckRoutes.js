// routes/deckRoutes.js
const express = require("express");

const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getDecks,
  createDeck,
  updateDeck,
  deleteDeck,
} = require("../controllers/deckController");

const router = express.Router();

// Use the controller function in the route
router.get("/decks", authenticateToken, getDecks);
router.post("/create-deck", authenticateToken, createDeck);
router.put("/decks/:deckId", authenticateToken, updateDeck);
router.delete("/decks/:deckId", authenticateToken, deleteDeck);

module.exports = router;
