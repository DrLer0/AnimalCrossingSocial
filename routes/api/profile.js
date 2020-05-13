const express = require("express");
const passport = require('passport');
// const auth = require();
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const checkObjectId = require('../../middleware/checkObjectId');

const router = express.Router();

// Load input validation
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar', 'date'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            res.status(200).json(profile);

        })
        .catch(err => {
            return res.status(404).json(err);
        });
});

//@route GET /api/profile/all
//@desc Get all profiles as an array
//@access Public

router.get('/all', async (req, res) => {

    Profile.find()
        .populate('user', ['name', 'avatar', 'date'])
        .then(profiles => {
            if (!profiles) {
                errors.noProfile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        }).catch(err => {
            return res.status(404).json({ profile: err });
        });

});

//@route    GET /api/profile/user/:user_id
//@desc     Get user profile by user id
//@access   Private
router.get('/user/:user_id', (req, res) => {

    const errors = {};
    Profile.findOne({ _id: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile by this id';
                return res.status(404).json(errors);
            }
            return res.status(200).json(profile);
        })
        .catch(err => {
            if (err.kind == 'ObjectId') {
                return res.status(404).json(err);
            }
            return res.status(500).send('Server error');
        });
});

router.get(
    '/user/:user_id',
    checkObjectId('user_id'),
    async ({ params: { user_id } }, res) => {
        try {
            const profile = await Profile.findOne({
                user: user_id
            }).populate('user', ['name', 'avatar']);

            if (!profile) return res.status(400).json({ msg: 'Profile not found' });

            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ msg: 'Server error' });
        }
    }
);

// @route   POST api/profile/me
// @desc    Create or update a user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(404).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handleName) profileFields.handleName = req.body.handleName;
    if (req.body.islandName) profileFields.islandName = req.body.islandName;
    if (req.body.localFruit) profileFields.localFruit = req.body.localFruit;
    if (req.body.turnipPrice) profileFields.turnipPrice = req.body.turnipPrice;
    if (req.body.hotItem) profileFields.hotItem = req.body.hotItem;
    if (req.body.hotItemPrice) profileFields.hotItemPrice = req.body.hotItemPrice;
    if (req.body.celeste) profileFields.celeste = req.body.celeste;
    if (req.body.sahara) profileFields.sahara = req.body.sahara;
    if (req.body.entryFee) profileFields.entryFee = req.body.entryFee;
    if (req.body.dodoCode) profileFields.dodoCode = req.body.dodoCode;

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

    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            //Update

            Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            }).then(profile => res.json(profile));
        } else {
            //Create

            //Check Handle
            Profile.findOne({ user: req.user.id }).then(profile => {
                if (profile) {
                    errors.handle = 'That handle already exists';
                    return res.status(404).json(errors);
                }
                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });

});

module.exports = router;