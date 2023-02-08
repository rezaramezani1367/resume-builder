const express = require("express");
const {
  loginUser,
  signupUser,
  updateProfile,
  updateUserImage
} = require("../controllers/userControllers");
const uploadImage = require("../utils/upload");
const router = express.Router();

router.route("/login").get(loginUser);
router.route("/signup").post(signupUser);
router.route("/updateProfile").post(updateProfile);
router.route("/updateUserImage").put(
  uploadImage.single("image"),
  (req, res, next) => {
    
    if (!req.file) {
      req.body.image = null;
    } else {
      // req.body.image = req.file.filename;
      req.body.image = req.file.path.replace(/\\/g, "/").substring(6);
    }
    next();
  },
  updateUserImage
);


module.exports = router;
