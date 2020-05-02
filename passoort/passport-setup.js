const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const db = require("../models");

// serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializeUser
passport.deserializeUser((id, done) => {
    db.User.findOne({
        where: {
            id: id
        }
    }).then((user) => {
        done(null, user);
    });
});

// strategy for a local user
passport.use(
    new LocalStrategy({
        usernameField: "email"
    }, (email, password, done) => {
        db.User.findOne({
            where: {
                email: email
            }
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: "Incorrect username."
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
        }).then((user) => {
            return done(null, user);
        });
    })
);
