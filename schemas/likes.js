const mongoose = require("mongoose");
const { Schema } = mongoose;
const likeSchema = new Schema({

    userId: {
        type: String,
        required: false,
    },
    postId: {
        type: String,
        required: false,
    },
    nickname: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(`Like`, likeSchema);