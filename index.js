
require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const { db } = require("./src/models");
const indexRouter = require("./src/routes/api");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/api", indexRouter);

// Routes
app.get("/", (req, res) => {
  res.send({ success: true, message: "Welcome to Bidding server!" });
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
