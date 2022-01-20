const express = require("express");
const router = express.Router();

//routes
const userRoute = require("./user");
const postRoute = require("./post");
const commentRoute = require("./comment");
// landing page
router.get("/", (req, res) => {
  res.send("Landing Page");
});

//assign route
router.use("/user", userRoute);
router.use("/post", postRoute);
router.use("/comment", commentRoute);

module.exports = router;
