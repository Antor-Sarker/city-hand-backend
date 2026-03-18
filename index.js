const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect database
connectDB()

//routes

app.get("/", (req, res) => {
  res.send("city-hand api");
});

//error handeler

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
