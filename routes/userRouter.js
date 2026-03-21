const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.patch("/profile", authMiddleware, updateProfile);

module.exports = userRouter;
