const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const freelancerRoutes = require("./freelancer.routes");
const ClientRoutes = require("./client.routes");



router.use("/auth" , authRouter);
router.use("/user/freelancers" , freelancerRoutes);
router.use("/user/clients" , ClientRoutes);
module.exports = router;