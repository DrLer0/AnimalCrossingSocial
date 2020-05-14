/* Image mongoose model */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create an image schema
const imageSchema = new Schema({
  user: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  image_id: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  created_at: String,
});

// create an image model using the schema
const Image = mongoose.model("Image", imageSchema);

module.exports = { Image };
