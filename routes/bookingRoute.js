const express = require("express");
const bookingRouter = express.Router()
 
const verifyToken = require("../middleware/verifyToken");
const authorize = require("../middleware/authorize");
const { getSelfBookings, createBooking, updateBooking } = require("../controllers/bookingController");
 
bookingRouter.post("/", verifyToken, authorize(["client"]),createBooking);
bookingRouter.get("/", verifyToken, authorize(["client"]), getSelfBookings);

bookingRouter.patch(    
  "/update/:id",
  verifyToken,
  authorize(["client","admin"]),
  updateBooking,
);
module.exports = bookingRouter;