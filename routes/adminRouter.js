const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const authorize = require("../middleware/authorize")
const {getAllBooking } = require("../controllers/admin/booking/getAllBooking")
const adminRouter = express.Router()

adminRouter.get("/booking",verifyToken,authorize(["admin"]), getAllBooking)
   
module.exports = adminRouter