const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    islandName: {
        type: String
    },
    localFruit: {
        type: String
    },
    events: [
        {
            turnipPrice:{
                type:String
            },
            hotItem:{
                type: String,
            },
            celeste:{
                type: String
            },
            sahara:{
                type: String
            }
        }
    ],
    designs: {
        type: String
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);