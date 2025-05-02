const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { getFolders, createFolder } = require("../controllers/folderController");

router.get("/folders", authenticateToken, getFolders);
router.post("/create-folder", authenticateToken, createFolder);
module.exports = router;
