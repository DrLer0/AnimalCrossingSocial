const express = require("express");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const passport = require("passport");
const path = require("path");

// DB Config
const db = require("./models")

const port = process.env.PORT || 3001; // process.env.port is Heroku's port if you choose to deploy the app there

//const users = require("./routes/api/users");
const app = express();
// Bodyparser middleware

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// // DB Config
// const db = require("./models")
// Connect to MongoDB
mongoose.connect("mongodb://localhost/animal-crossing-app", { useNewURLParser: true});
// Passport middleware
//app.use(passport.initialize());
// Passport config
//require("./config/passport")(passport);
// Routes
require ("./routes/api/event-api-routes")(app);
require ("./routes/api/user-api-routes")(app);
require ("./routes/api/design-api-routes")(app);
//app.use("/api/users", users);
// Define API routes here
// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);
//   console.log('Sent list of items');
// });
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(port, () => {
  console.log(`:earth_americas: ==> API server now on port ${port}!`);
});





