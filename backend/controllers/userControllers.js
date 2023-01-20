const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");

exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  return res.json({
    success: true,
    data: user,
  });
  /*const user = await User.checkValidCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.newAuthToken();
    user["token1"] = token;
    res.send({ user });*/
});
