const express = require("express");
const { loginUser,signupUser } = require("../controllers/userControllers");
const router = express.Router();

router.route("/login").get(loginUser);
router.route("/signup").post(signupUser);

module.exports = router;
