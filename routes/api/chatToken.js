const express = require("express");
const router = express.Router();
const stream = require('getstream');

// Load User model
const User = require("../../models/User");

// @route GET api/chatToken
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send('Chat Token route'));

// @route POST api/chatToken/get
// @desc Get Chat Token
// @access Public
router.get("/get/:id", (req, res) => {
    let apiKey;
    let apiSecret;
    User.findOne({ _id: req.params.id }).then(user => {
        if (user) {

            // apiKey = process.env.STREAM_API_KEY;
            // apiSecret = process.env.STREAM_API_SECRET;
            let client = stream.connect('vvj83ka3szt4', 'qmy8ps7sdze6d8jwb2ugxufyzm8y22aufh9933mbjzjvufwnpa52qrtmcb5weh7k', '77692');

            // // // if the channel does not exist, this creates a new channel (e.g. initialization)
            // const channel = client.channel('messaging', 'General');
            const token = client.createUserToken(user._id.toString());
            // channel.addMembers([user._id]);
            console.log("~~~~~~~~~");
            console.log(token);
            console.log("~~~~~~~~~");
            return res.json({ user, token });
            // return res.json(user);
        } else {
            return res.status(400).json({ email: "User doesn't exist" });
        }
    }).catch(err => res.status(404).json(err));
});

module.exports = router;
