const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../client");

const registerUser = async (req, res, next) => {
  try {
    const {
      body: { name, first_name, password, email },
    } = req;
    if (!name || !first_name || !password || !email)
      throw new Error("Name, first name, email and password are required");
    const { rowCount } = await query(
      `SELECT * FROM "User" WHERE "email" = $1`,
      [email]
    );
    if (rowCount) throw new Error("User already exists");
    const hash = await bcrypt.hash(password, 5);
    const {
      rows: [newUser],
    } = await query(
      `INSERT INTO "User"(name, first_name, password, email) VALUES($1, $2, $3, $4) RETURNING *`,
      [name, first_name, hash, email]
    );
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const {
      body: { password, email },
    } = req;
    if (!password || !email) throw new Error("Email and password are required");
    const {
      rowCount,
      rows: [user],
    } = await query(`SELECT * FROM "User" WHERE "email" = $1`, [email]);
    if (!rowCount) throw new Error("User does not exist");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Password is incorrect");
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const {
      rows: [user],
    } = await query(
      `SELECT first_name, name, email FROM "User" WHERE id = $1`,
      [userId.id]
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getUser };
