const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { PORT } = process.env;

const app = express();

// connect to mongodb db
connectDB();
// __basedir
global.__basedir = __dirname;
// cors
app.use(cors());

// access yo form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
