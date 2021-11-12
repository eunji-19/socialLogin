const express = require("express");
const router = express.Router();

const home = require("./home.js");
const user = require("./users.js");
const login = require("./login.js");
const logout = require("./logout.js");

router.use("/", home);
router.use("/user", user);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;
