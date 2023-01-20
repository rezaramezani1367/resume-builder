const mongoose = require("mongoose");

const connString = process.env.DATABASE_CONNECTION;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Mongodb connection SUCCESS ⭐");
  } catch (error) {
    console.log("Mongodb connection FAIL 💥");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
