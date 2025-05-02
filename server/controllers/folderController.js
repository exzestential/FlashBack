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

module.exports = { getFolders, createFolder };
