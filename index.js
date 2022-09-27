require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const { query } = require("./client.js");

app.use(cors());

app.get("/", async (req, res) => {
  const { rows } = await query('SELECT * FROM "Products"');
  console.log(rows);
  res.json(rows);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await query(`SELECT * FROM "Products" WHERE id=$1`, [id]);
  res.json(rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
