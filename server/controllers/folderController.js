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

const getFoldersWithDecks = async (req, res) => {
  const userId = req.user.userId; // Assuming user authentication

  try {
    // Execute the SQL query to get folders and decks
    const [result] = await db.query(
      `SELECT folders.folder_id, folders.name AS folder_name, decks.deck_id, decks.name AS deck_name
      FROM folders
      LEFT JOIN decks ON folders.folder_id = decks.folder_id
      WHERE folders.user_id = ?
      ORDER BY folders.folder_id, decks.created_at`,
      [userId]
    );

    // Group the result by folder
    const folders = result.reduce((acc, row) => {
      const folder = acc.find((f) => f.folder_id === row.folder_id);
      if (!folder) {
        acc.push({
          folder_id: row.folder_id,
          folder_name: row.folder_name,
          decks: row.deck_id
            ? [{ deck_id: row.deck_id, deck_name: row.deck_name }]
            : [],
        });
      } else if (row.deck_id) {
        folder.decks.push({ deck_id: row.deck_id, deck_name: row.deck_name });
      }
      return acc;
    }, []);

    res.status(200).json(folders); // Return the folders with their decks
  } catch (err) {
    console.error("Error fetching folders and decks:", err);
    res.status(500).json({ message: "Error fetching folders and decks" });
  }
};

const getDecksByFolder = async (req, res) => {
  const { folderId } = req.params;
  const { sortBy = "created_at", sortOrder = "DESC" } = req.query; // Default sorting by date in descending order

  try {
    // Fetch decks from the folder
    const [decks] = await db.query(
      `SELECT * FROM decks WHERE folder_id = ? AND is_deleted = 0 ORDER BY ${sortBy} ${sortOrder}`,
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

// Add this to your module.exports
module.exports = {
  getFolders,
  createFolder,
  getDecksByFolder,
  getFolderById,
};
