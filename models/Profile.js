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
        type: String
    },
    hotItem: {
        type: String
    },
    hotItemPrice: {
        type: String
    },
    entryFee: {
        type: String
    },
    celeste: {
        type: Boolean
    },
    sahara: {
        type: Boolean
    },
    dodoCode: {
        type: String
    },
    designs: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);