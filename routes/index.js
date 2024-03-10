const express = require("express");
const router = express.Router();

router.use("/user", require("./user/userRoutes"));
router.use("/post", require("./post/postRoute"));

module.exports = router;
