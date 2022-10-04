const verifyToken = require("../middlewares/verifyToken");
const authControllers = require("../controllers/auth");
const { getUser, loginUser, registerUser } = authControllers;

const authRouter = require("express").Router();

authRouter.post("/signup", registerUser);

authRouter.post("/signin", loginUser);

authRouter.get("/me", verifyToken, getUser);

module.exports = authRouter;
