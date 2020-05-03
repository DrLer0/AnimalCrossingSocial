const router = require("express").Router();
const passport = require("passport");
//const db = require("../models");

router.get("/logout", (req, res) => {
  //handle with passport
  req.logout();
  res.redirect("/");
});

// Login post request
router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/home");
  }
);

// register get request
router.get("/register", (req, res) => {
  res.render("register");
});

// add new user to database
router.post("/register", (req, res) => {
  const user = req.body;
  db.User.create({
    username: user.username,
    email: user.email,
    password: user.password,
  }).then((newUser) => {
    console.log("New User", newUser);
    res.redirect("/");
  });
});

module.exports = router;
