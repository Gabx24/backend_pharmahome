require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRouter");
const productsRouter = require("./routes/productsRouter");
const errorHandler = require("./middlewares/errorHandler");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
