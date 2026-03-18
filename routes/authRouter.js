const express = require("express");
const { register, login } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

module.exports = authRouter;
