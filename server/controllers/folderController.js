const db = require("../config/db"); // Your DB connection (e.g. using pg, mysql2, or Sequelize)

const getFolders = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Join decks with folders to get the color of the folder associated with each deck
    const [folders] = await db.query(
      `SELECT * FROM folders WHERE folders.user_id = ?`,
      [userId]
    );

    res.json(folders);
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error fetching folders" });
  }
};

const createFolder = async (req, res) => {
  const { name, color } = req.body;
  const userId = req.user.userId;

  if (!name || !color) {
    return res.status(400).json({ message: "name is required" });
  }

  try {
    // Insert new deck into the database
    const [result] = await db.query(
      `INSERT INTO folders (name, color, user_id, last_modified)
             VALUES (?, ?, ?, NOW())`,
      [name, color, userId]
    );

    // Respond with the newly created deck
    res.status(201).json({
      message: "Folder created successfully",
      folder: {
        folder_id: result.insertId,
        name,
        color: color,
        user_id: userId,
      },
    });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Failed to create folder" });
  }
};

const getDecksByFolder = async (req, res) => {
  const { folderId } = req.params;
  const { sortBy = "created_at", sortOrder = "DESC" } = req.query;

  try {
    // Updated query to include card count
    const [decks] = await db.query(
      `SELECT 
        decks.*,
        COUNT(cards.card_id) AS card_count
      FROM decks 
      LEFT JOIN cards ON cards.deck_id = decks.deck_id
      WHERE decks.folder_id = ? AND decks.is_deleted = 0 
      GROUP BY decks.deck_id
      ORDER BY ${sortBy} ${sortOrder}`,
      [folderId]
    );

    res.json(decks);
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Failed to fetch decks" });
  }
};
// Add this function to your existing folderController.js

const getFolderById = async (req, res) => {
  const { folderId } = req.params;
  const userId = req.user.userId;

  try {
    // Get folder details
    const [folders] = await db.query(
      `SELECT * FROM folders WHERE folder_id = ? AND user_id = ?`,
      [folderId, userId]
    );

    if (folders.length === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const folder = folders[0];

    // Get folder's decks count
    const [decksCountResult] = await db.query(
      `SELECT COUNT(*) as count FROM decks 
       WHERE folder_id = ? AND user_id = ? AND is_deleted = 0`,
      [folderId, userId]
    );

    const deckCount = decksCountResult[0].count;

    res.json({
      ...folder,
      deck_count: deckCount,
    });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error fetching folder" });
  }
};

const deleteFolder = async (req, res) => {
  const { folderId } = req.params;
  const userId = req.user.userId;

  try {
    // First check if the deck exists and belongs to the user
    const [folder] = await db.query(
      `SELECT folder_id FROM folders 
       WHERE folder_id = ? AND user_id = ?`,
      [folderId, userId]
    );

    if (folder.length === 0) {
      return res
        .status(404)
        .json({ message: "Folder not found or unauthorized" });
    }

    // Soft delete the deck by updating is_deleted and deleted_at
    const [result] = await db.query(
      `DELETE FROM folders 
       WHERE folder_id = ?`,
      [folderId]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Failed to delete folder" });
    }

    res.json({ message: "folder deleted successfully" });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error deleting deck" });
  }
};

const updateFolder = async (req, res) => {
  const { folderId } = req.params;
  const { name, color } = req.body;
  const userId = req.user.userId;

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  try {
    // First check if the deck exists and belongs to the user
    const [folder] = await db.query(
      `SELECT folder_id FROM folders 
       WHERE folder_id = ? AND user_id = ?`,
      [folderId, userId]
    );

    if (folder.length === 0) {
      return res
        .status(404)
        .json({ message: "Folder not found or unauthorized" });
    }

    // Update the deck
    const [result] = await db.query(
      `UPDATE folders 
       SET name = ?, color = ?, last_modified = NOW() 
       WHERE folder_id = ? AND user_id = ?`,
      [name, color, folderId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Failed to update folders" });
    }

    // Get the updated deck to return
    const [updatedFolder] = await db.query(
      `SELECT
         folders.folder_id,
         folders.name,
         folders.last_modified,
         folders.color 
       FROM folders
       WHERE folders.folder_id = ?`,
      [folderId]
    );

    res.json({
      message: "Folder updated successfully",
      folder: updatedFolder[0],
    });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ message: "Server error updating folder" });
  }
};

// Add this to your module.exports
module.exports = {
  getFolders,
  createFolder,
  getDecksByFolder,
  getFolderById,
  deleteFolder,
  updateFolder,
};
