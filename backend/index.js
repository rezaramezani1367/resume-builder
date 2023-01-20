const express = require("express");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");
const { PORT } = process.env;
// connect to mongodb db
connectDB();

const app = express();

// __basedir
global.__basedir = __dirname;

// input values
app.use(express.urlencoded({ extended: true }));
// static file
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.send("server is running...");
});

// Routes
app.use("/user", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
