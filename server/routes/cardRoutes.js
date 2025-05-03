const express = require("express");

const { authenticateToken } = require("../middleware/authMiddleware");
const { getCards } = require("../controllers/cardController");

const router = express.Router();

router.get("/decks/:deckId", authenticateToken, getCards);

module.exports = router;
