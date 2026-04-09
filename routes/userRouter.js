const express = require("express");
const userRouter = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const authorize = require("../middleware/authorize");

userRouter.get("/profile", verifyToken, authorize(["client","admin"]), getProfile);
userRouter.patch("/profile", verifyToken, authorize(["client","admin"]), updateProfile);

module.exports = userRouter;
