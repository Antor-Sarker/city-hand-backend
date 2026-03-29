const express = require("express");
const userRouter = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const {
  createBooking,
  getBookings,
  updateBooking,
} = require("../controllers/bookingController");
const verifyToken = require("../middleware/verifyToken");
const authorize = require("../middleware/authorize");

userRouter.get("/profile", verifyToken, authorize(["client"]), getProfile);
userRouter.patch("/profile", verifyToken, authorize(["client"]), updateProfile);

userRouter.post("/booking", verifyToken, authorize(["client"]), createBooking);
userRouter.get("/bookings", verifyToken, authorize(["client"]), getBookings);
userRouter.patch(
  "/booking/:id",
  verifyToken,
  authorize(["client"]),
  updateBooking,
);
module.exports = userRouter;
