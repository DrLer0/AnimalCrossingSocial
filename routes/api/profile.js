const express = require("express");
const passport = require('passport');
// const auth = require();
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

// Load input validation
const validateProfileInput  = require('../../validation/profile');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/',passport.authenticate('jwt',{ session: false}),(req,res) =>{
    
    const errors = {};
    Profile.findOne({user: req.user.id})
    .populate('user',['name','avatar'])
    .then( profile => {
        if(!profile){
            errors.noProfile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.status(200).json(profile);

    })
    .catch(err =>{
        return res.status(404).json(err);
    });
});

// @route   POST api/profile/me
// @desc    Create or update a user profile
// @access  Private
router.post('/',passport.authenticate ('jwt',{ session: false}),(req,res) =>{
  
    const {errors,isValid} = validateProfileInput(req.body);

    if(!isValid){
        return res.status(404).json(errors);
    }

    const profileFields = {}
    profileFields.user = req.user.id;
    if(req.body.islandName) profileFields.islandName = req.body.islandName;
    if(req.body.localFruit) profileFields.localFruit = req.body.localFruit;
    // if(req.body.company) profileFields.company = req.body.company;
    // if(req.body.website) profileFields.website = req.body.website;
    // if(req.body.location) profileFields.location = req.body.location;
    // if(req.body.status) profileFields.status = req.body.status;
    // if(req.body.bio) profileFields.bio = req.body.bio;
    // if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Add Skills
    // if(typeof req.body.skills !== undefined)
    //     profileFields.skills = req.body.skills.split(',');

    // Add Social
    // profileFields.social = {};
    // if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    // if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    // if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    // if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    // if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

  
    Profile.findOne({user: req.user.id}).then(profile =>{
        if(profile){
        //Update

            Profile.findOneAndUpdate({
                user: req.user.id
            },{
                $set: profileFields
            },{
                new : true
            }).then(profile => res.json(profile))
        }else{
            //Create

            //Check Handle
            Profile.findOne({user: req.user.id}).then(profile => {
                if(profile){
                    errors.handle = 'That handle already exists';
                    return res.status(404).json(errors)
                }
                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })

});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/all',(req,res) => {

    Profile.find()
    .populate('user',['name','avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noProfile = 'There are no profiles';
            return res.status(404).json(errors);
        }
        res.json(profiles)
    }).catch(err =>{
        return res.status(404).json({profile: err});
    });

});

//@route    GET /api/profile/user/:user_id
//@desc     Get user profile by user id
//@access   Public
router.get('/user/:user_id',(req,res) =>{

    const errors = {};
    Profile.findOne({_id: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile =>{
        if(!profile){
            errors.noProfile = 'There is no profile by this handle'
            return res.status(404).json(errors);
        }
        return res.status(200).json(profile)
    })
    .catch(err => {
        if (err.kind == 'ObjectId') {
            return res.status(404).json(err);
        }
        return res.status(500).send('Server error');
    });
});

module.exports = router;