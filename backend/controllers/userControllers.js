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
  const session = await mongoose.startSession();
  try {
    let user={}
    session.startTransaction();
    const profile = await Profile.create([req.body], { session }).then(
      async (prof) => {
         user = await User.create([{ ...req.body, profile: prof._id }], {
          session,
        });
      }
    );

    
    res.status(201).send({
      userData: user,
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return next(new ErrorResponse(error.message, 404));
  }
  await session.commitTransaction();
  session.endSession;
});
exports.summaryProfile = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const profile = new Profile(req.body);
  await profile.save();
  res.status(201).send({ profileData: profile, isSuccess: true });
});
