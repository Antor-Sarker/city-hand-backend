const express = require("express");
const serviceRouter = express.Router();
const { getServices, serviceDetails } = require("../controllers/serviceController");
const authorize = require("../middleware/authorize");
const verifyToken = require("../middleware/verifyToken")
const upload = require("../middleware/upload");
const { createService } = require("../controllers/admin/service/serviceController");
 
serviceRouter.get("/", getServices);
serviceRouter.get("/:id", serviceDetails)
serviceRouter.post("/",verifyToken,authorize(["admin"]),upload.single("image"),createService)
module.exports = serviceRouter;
