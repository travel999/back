const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    nickname: {
        type: String,
        minlength: 1,
        maxlength: 14,
        required: true,
        unique: true,
    },
    userImage: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


    snsId: {//카카오
        type: String,


    },
    provider: {//카카오
        type: String
    },
    profile_image: {//카카오
        type: String
    },


},{ strict: false });

module.exports = mongoose.model(`User`, userSchema);
