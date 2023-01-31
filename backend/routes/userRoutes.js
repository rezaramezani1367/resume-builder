const express = require("express");
const { loginUser,signupUser,summaryProfile } = require("../controllers/userControllers");
const router = express.Router();

router.route("/login").get(loginUser);
router.route("/signup").post(signupUser);
router.route("/summaryProfile").post(summaryProfile);

module.exports = router;
