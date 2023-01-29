const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

var uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (
          !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
            value
          )
        ) {
          throw new Error(
            `password must be at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character`
          );
        }
      },
    },
    mobile: {
      type: "String",
      required: true,
      unique: true,
      validate(value) {
        if (!/^[0][9][0-9]{9}$/.test(value)) {
          throw new Error(
            `The mobile field must be number(11character) and started by 09 example 09123456789`
          );
        }
      },
    },
    image: {
      type: String,
      require: true,
      default: "/profile-image/images.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },

  { versionKey: false }
);

UserSchema.statics.checkValidCredentials = async (email, password) => {
  const user = await User.findOne()
    .or([{ email }, { username: email }])
    .populate("profile");

  if (!user) {
    throw new Error("email or password worng");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("email or password worng");
  }

  return user;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;

  return { ...userObj };
};

//hash the plain text password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);
// Apply the uniqueValidator plugin to UserSchema.
UserSchema.plugin(uniqueValidator, {
  message: (e) => {
    switch (e.path) {
      case "username":
        return "نام کاربری تکراری می باشد.";
      case "mobile":
        return "موبایل تکراری می باشد.";
      case "email":
        return "ایمیل تکراری می باشد.";
      default:
        break;
    }

  },
});
module.exports = User;
