const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  getFolders,
  createFolder,
  getDecksByFolder,
  getFolderById,
  deleteFolder,
  updateFolder,
} = require("../controllers/folderController");

router.get("/folders", authenticateToken, getFolders); // Fetch all folders for user
router.get("/folders/:folderId", authenticateToken, getFolderById); // Fetch a specific folder
router.get("/folders/:folderId/decks", authenticateToken, getDecksByFolder); // Fetch decks for a specific folder
router.post("/create-folder", authenticateToken, createFolder); // Create a new folder
router.delete("/folders/:folderId", authenticateToken, deleteFolder);
router.put("/folders/:folderId", authenticateToken, updateFolder);

module.exports = router;
