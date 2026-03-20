const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const serviceRouter = require("./routes/serviceRoutes");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.postman.com",
  process.env.FRONTEND_URL,
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

//connect database
connectDB();

//routes
app.use("/api/service", serviceRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("city-hand api");
});

//error handeler

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
