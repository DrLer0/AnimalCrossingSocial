const express = require("express");
const passport = require('passport');

const Designs = require("../../models/Designs");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

// Load input validation
const validateDesignsInput  = require('../../validation/designs');

// @route GET api/designs
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Designs route'));

// @route   POST api/designs
// @desc    Post a design
// @access  Private
router.post('/',passport.authenticate('jwt',{session:false}), async (req,res) => {

    const {errors,isValid} = validateDesignsInput(req.body);

    if(!isValid){
        res.status(404).json(errors);
    }

    const user = await User.findById(req.user.id).select('-password');

    const newDesigns = new Designs({
        title : req.body.title,
        description : req.body.description,
        twitterLink : req.body.twitterLink,
        user : req.user.id,
        name: user.name
    })

    newDesigns.save().then((post) => {
       return res.json(post)
    }).catch((err) => {
        return res.status(404).json(err)
    });
});

module.exports = router;