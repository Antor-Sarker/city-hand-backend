const express = require("express");
const serviceRouter = express.Router();
const { getServices, serviceDetails } = require("../controllers/serviceController");
const authMiddleware = require("../middleware/authMiddleware");

serviceRouter.get("/", getServices);
serviceRouter.get("/:id",authMiddleware, serviceDetails)
module.exports = serviceRouter;
