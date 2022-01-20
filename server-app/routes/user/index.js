const express = require("express");
const { login, getUser, register } = require("../../controllers/User");
const router = express.Router();

//******routes**********
// get specific user
router.get("/:userId", getUser);
// login
router.post("/login", login);

// Register
router.post("/register", register);
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];

//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }

module.exports = router;
