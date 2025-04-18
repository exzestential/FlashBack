// backend/controllers/AuthController.js
const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.signup = async (req, res) => {
  const { userType, interests, username, email, password } = req.body;
  try {
    // 1. Hash the password
    const hash = await bcrypt.hash(password, 10);

    // 2. Insert into DB
    const sql = `INSERT INTO users (userType, interests, username, email, password)
                 VALUES (?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [userType, JSON.stringify(interests), username, email, hash],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ message: "Username or email already in use" });
          }
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res
          .status(201)
          .json({ message: "User created", userId: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
