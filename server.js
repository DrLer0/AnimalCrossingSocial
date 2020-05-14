const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const port = process.env.PORT || 3001; // process.env.port is Heroku's port if you choose to deploy the app there

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const chatToken = require("./routes/api/chatToken");

const app = express();

// Set up server client for Stream Chat
var stream = require("getstream");
client = stream.connect(
  "4rp6s2sacz3q",
  "hrbfmb2dx9hkjz24mttn4gshrndf235dvy7db5g4dgc7fy9c6pzkunjgdh55863s",
  "77693"
);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// DB Config
const db = require("./config/keys").MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
// const cloudinary = require("cloudinary");
// cloudinary.config({
//   cloud_name: "dxqacueyl",
//   api_key: "552266528841512",
//   api_secret: "gy5bAZjR_paARAc2I1pBm99SCUM",
// });

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/chatToken", chatToken);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
  console.log(`🌎 ==> API server now on port ${port}!`);
});
