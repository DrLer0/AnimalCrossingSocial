const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  islandName: {
    type: String,
    required: false
  }, 
  islandFruit: {
    type: String,
    required: false
  }, 
  events: [
    {
    type: Schema.Types.ObjectId,
    ref: "Event"
    }
    ],
  designs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Design"
        }
    ]   
});

module.exports = User = mongoose.model("users", UserSchema);
