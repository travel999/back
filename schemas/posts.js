const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
    Nickname: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    Day:{
        type: Number,
        required: true,
    },
    cardNum:{
        type: Number,
        required: true,
    },
    PlaceName:{
        type: String,
        required: true,
    },
    Locate:{
        type: String,
        required: true,
    },
    Content:{
        type: String,
        required: true,

    },
    OpenPublic:{
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model(`Post`, postSchema);