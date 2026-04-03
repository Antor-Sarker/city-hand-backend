const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const authorize = require("../middleware/authorize")
const { getBooking } = require("../controllers/admin/booking/getBooking")
const adminRouter = express.Router()

adminRouter.get("/booking",verifyToken,authorize(["admin"]), getBooking)

module.exports = adminRouter