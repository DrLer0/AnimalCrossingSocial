const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handleName: {
        type: String
    },
    islandName: {
        type: String
    },
    localFruit: {
        type: String
    },
    turnipPrice: {
        type: Number
    },
    hotItem: {
        type: String
    },
    hotItemPrice: {
        type: Number
    },
    entryFee: {
        type: Number
    },
    celeste: {
        type: Boolean
    },
    sahara: {
        type: Boolean
    },
    designs: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);