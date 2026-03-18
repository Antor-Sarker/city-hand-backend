const express = require("express");
const serviceRouter = express.Router();
const { getServices, serviceDetails } = require("../controllers/serviceController");

serviceRouter.get("/", getServices);
serviceRouter.get("/:id", serviceDetails)
module.exports = serviceRouter;
