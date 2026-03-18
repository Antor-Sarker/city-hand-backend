const express = require("express");
const serviceRouter = express.Router();
const { getServices } = require("../controllers/serviceController");

serviceRouter.get("/", getServices);

module.exports = serviceRouter;
