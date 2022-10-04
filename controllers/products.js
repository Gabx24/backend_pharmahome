const { query } = require("../client");

const getAllProducts = async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM "Products"');
    console.log(rows);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await query(`SELECT * FROM "Products" WHERE id=$1`, [id]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts, getSingleProduct };
