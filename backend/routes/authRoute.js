const express = require("express");
const router = express.Router();
const { signup, login, logout,updateCoin } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-coin/:id",updateCoin)
module.exports = router;
