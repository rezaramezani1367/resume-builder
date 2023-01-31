const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const profileSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      minLength: [5, "{PATH} must be least 5 character"],
    },

    jobTitle: {
      type: String,
      minLength: [2, "{PATH} must be least 2 character"],
    },
    employmentStatus: {
      type: String,
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
    province: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["متاهل", "مجرد"],
    },

    maritalStatus: {
      type: String,
    },
    militarySituation: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
  },
  { versionKey: false }
);

const Profile = mongoose.model("Profile", profileSchema);

// Apply the uniqueValidator plugin to profileSchema.
profileSchema.plugin(uniqueValidator, {
  message: "{PATH} already exists(must be unique)",
});
module.exports = Profile;
