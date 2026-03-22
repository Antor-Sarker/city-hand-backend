const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");
const { createBooking } = require("../controllers/bookingController");

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.patch("/profile", authMiddleware, updateProfile);
userRouter.post("/booking",authMiddleware,createBooking)

module.exports = userRouter;
