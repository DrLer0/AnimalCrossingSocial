const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
// An api endpoint that returns a short list of items
//move routes to routes folder and require here

//routes
//==============================
require("./routes/api/user-api-routes")(app);
require("./routes/api/event-api-routes")(app);
require("./routes/api/yardSale-api-routes")(app);
//add other routes (e.g. html routes, authroutes)
//remove this code, replaced with routes
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

db.sequelize.sync().then(function() {
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

});
