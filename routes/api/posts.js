const express = require("express");
const passport = require('passport');

const Posts = require("../../models/Posts");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

// Load input validation
const validatePostInput  = require('../../validation/post');

// // @route GET api/post
// // @desc Test route
// // @access Public
// router.get('/', (req, res) => res.send('Posts route'));

// @route   POST api/post
// @desc    Post a design
// @access  Private
router.post('/',passport.authenticate('jwt',{session:false}), async (req,res) => {

    const {errors,isValid} = validatePostInput(req.body);

    if(!isValid){
        res.status(404).json(errors);
    }

    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
        title : req.body.title,
        description : req.body.description,
        twitterLink : req.body.twitterLink,
        user : req.user.id,
        name: user.name
    })

    newPost.save().then((post) => {
       return res.json(post)
    }).catch((err) => {
        return res.status(404).json(err)
    });
});

//@route GET /api/post
//@desc Get all posts
//@access Private
router.get('/',passport.authenticate('jwt',{session:false}), (req,res) => {

    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts)).catch(err => res.status(404).json(err));
});

module.exports = router;