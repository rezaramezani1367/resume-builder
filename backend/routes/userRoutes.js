const express = require("express");
const { loginUser,signupUser,updateProfile} = require("../controllers/userControllers");
const router = express.Router();

router.route("/login").get(loginUser);
router.route("/signup").post(signupUser);
router.route("/updateProfile").post(updateProfile);


module.exports = router;
