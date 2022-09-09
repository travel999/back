const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
    nickname: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    openPublic: {
        type: Boolean,
        default: false
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    like: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


},{ strict: false }); //{ strict: false } 스키마에 제약 없이 DB에 저장가능

module.exports = mongoose.model(`Post`, postSchema);