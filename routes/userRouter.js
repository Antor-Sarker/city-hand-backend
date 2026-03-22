const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");
const { createBooking, getBookings } = require("../controllers/bookingController");

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.patch("/profile", authMiddleware, updateProfile);

userRouter.post("/booking",authMiddleware,createBooking)
userRouter.get("/bookings",authMiddleware,getBookings)

module.exports = userRouter;
