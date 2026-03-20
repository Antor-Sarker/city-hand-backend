const express = require("express");
const { register, login, refreshToken, logOut } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/refreshToken",refreshToken)
authRouter.post("/logout",logOut)

module.exports = authRouter;
