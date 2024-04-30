const express = require("express");
const router = express.Router();
const authRouter = require("./user.routes");


router.use("/auth" , authRouter);
module.exports = router;