const productsControllers = require("../controllers/products");
const { getAllProducts, getSingleProduct } = productsControllers;

const productsRouter = require("express").Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getSingleProduct);

module.exports = productsRouter;
