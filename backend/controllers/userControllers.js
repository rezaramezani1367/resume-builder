const mongoose = require("mongoose");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const Profile = require("../models/Profile");
const ErrorResponse = require("../utils/errorResponse");

exports.loginUser = asyncHandler(async (req, res, next) => {
  // const user = await User.find();

  return res.json({
    IsSuccess: true,
    userData: req.user,
  });
});
exports.signupUser = asyncHandler(async (req, res, next) => {
  const session = await mongoose.startSession({
    defaultTransactionOptions: {},
  });
  try {
    let user = {};
    session.startTransaction();
    const profile = await Profile.create([req.body], { session }).then(
      async (prof) => {
        user = await User.create([{ ...req.body, profile: prof[0]._id }], {
          session,
        });
      }
    );
    res.status(201).send({
      userData: await user[0].populate("profile"),
      isSuccess: true,
    });
  } catch (err) {
    await session.abortTransaction();
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((error) => error.message)
        .join("<br/>");
      return next(new ErrorResponse(message, 404));
    }
    return next(new ErrorResponse("مشکل در ثبت اطلاعات", 404));
  }
  await session.commitTransaction();
  session.endSession;
});
exports.summaryProfile = asyncHandler(async (req, res, next) => {
  await Profile.findByIdAndUpdate(req.user.profile, req.body);

  res.status(201).send({
    userData: await User.findOne({ _id: req.user._id }).populate("profile"),
    isSuccess: true,
  });
});
