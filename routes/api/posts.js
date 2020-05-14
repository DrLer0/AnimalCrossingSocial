const express = require("express");
const passport = require("passport");

const Posts = require("../../models/Posts");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { Image } = require("../../models/Image");

const router = express.Router();

// Load input validation
const validatePostInput = require("../../validation/post");

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dxqacueyl",
  api_key: "552266528841512",
  api_secret: "gy5bAZjR_paARAc2I1pBm99SCUM",
});

// // @route GET api/post
// // @desc Test route
// // @access Public
// router.get('/', (req, res) => res.send('Posts route'));

// @route   POST api/post
// @desc    Post a design
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  multipartMiddleware,
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      res.status(404).json(errors);
    }

    const user = await User.findById(req.user.id).select("-password");
    console.log("!!!!!!!!!!!!!!" + user);
    console.log("!!!!!!!!!!!!!!" + req.body);

    cloudinary.uploader.upload(
      req.files.image.path, // req.files contains uploaded files

      function (result) {
        // Create a new image using the Image mongoose model
        var img = new Image({
          title: req.body.title,
          description: req.body.description,
          twitterLink: req.body.twitterLink,
          // user: req.user.id,
          // name: user.name,
          image_id: result.public_id, // image id on cloudinary server
          image_url: result.url, // image url on cloudinary server
          created_at: new Date(),
        });

        console.log(img);

        // Save image to the database
        img.save().then(
          (saveRes) => {
            res.send(saveRes);
          },
          (error) => {
            res.status(400).send(error); // 400 for bad request
          }
        );
      }
    );

    // const newPost = new Post({
    //   title: req.body.title,
    //   description: req.body.description,
    //   twitterLink: req.body.twitterLink,
    //   user: req.user.id,
    //   name: user.name,
    // });

    // newPost
    //   .save()
    //   .then((post) => {
    //     return res.json(post);
    //   })
    //   .catch((err) => {
    //     return res.status(404).json(err);
    //   });
  }
);

// a POST route to *create* an image
router.post(
  "/images",
  //   passport.authenticate("jwt", { session: false }),
  multipartMiddleware,
  (req, res) => {
    // const user = User.findById(req).select("-password");
    //   const user = User.find();
    console.log(req);
    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
      req.files.image.path, // req.files contains uploaded files

      function (result) {
        // Create a new image using the Image mongoose model
        var img = new Image({
          title: req.body.title,
          description: req.body.description,
          twitterLink: req.body.twitterLink,
          user: req.body.user,
          name: req.body.name,
          image_id: result.public_id, // image id on cloudinary server
          image_url: result.url, // image url on cloudinary server
          created_at: new Date(),
        });

        console.log(img);

        // Save image to the database
        img.save().then(
          (saveRes) => {
            res.send(saveRes);
          },
          (error) => {
            res.status(400).send(error); // 400 for bad request
          }
        );
      }
    );
  }
);

//@route GET /api/post
//@desc Get all posts
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Image.find()
      .sort({ created_at: -1 })
      .then(
        (images) => {
          //   res.json(images);
          res.send({ images }); // can wrap in object if want to add more properties
        },
        (error) => {
          res.status(500).send(error); // server error
        }
      );

    // Post.find()
    //   .sort({ date: -1 })
    //   .then((posts) => res.json(posts))
    //   .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
