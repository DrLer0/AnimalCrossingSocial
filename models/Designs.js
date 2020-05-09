const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DesignsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    twitterLink: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ]
});

module.exports = Designs = mongoose.model("designs", DesignsSchema)