const mongoose = require("mongoose");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const Profile = require("../models/Profile");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const path = require("path");

exports.loginUser = asyncHandler(async (req, res, next) => {
  // const user = await User.find();

  return res.json({
    isSuccess: true,
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
exports.updateProfile = asyncHandler(async (req, res, next) => {
  await Profile.findByIdAndUpdate(req.user.profile, req.body, {
    runValidators: true,
  });

  res.status(201).send({
    userData: await User.findOne({ _id: req.user._id }).populate("profile"),
    isSuccess: true,
  });
});
exports.updateUserImage = asyncHandler(async (req, res, next) => {
  const defaultImage = "/profile-image/images.png";
  if (req.user.image !== defaultImage) {
    fs.unlink(path.join(__basedir, "/public", req.user.image), (err) => {
      if (err) {
        new Error(err);
      }
    });
  }
  if (!req.body.image) {
    throw new Error("image field is empty!");
  }
  await User.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
  });

  res.status(201).send({
    userData: await User.findOne({ _id: req.user._id }).populate("profile"),
    isSuccess: true,
  });
});
