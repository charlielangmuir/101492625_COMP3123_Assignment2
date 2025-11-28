const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;
