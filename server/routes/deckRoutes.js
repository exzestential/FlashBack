// routes/deckRoutes.js
const express = require("express");

const { authenticateToken } = require("../middleware/authMiddleware");
const { getDecks, createDeck } = require("../controllers/deckController");

const router = express.Router();

// Use the controller function in the route
router.get("/decks", authenticateToken, getDecks);
router.post("/create-deck", authenticateToken, createDeck);

module.exports = router;
