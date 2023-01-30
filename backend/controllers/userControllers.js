const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

exports.loginUser = asyncHandler(async (req, res, next) => {
  // const user = await User.find();

  return res.json({
    IsSuccess: true,
    userData: req.user,
  });
});
exports.signupUser = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send({ userData:user, isSuccess: true });
});
