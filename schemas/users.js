const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        // trim : true,
        required: false,
    },
    password: {
        type: String,
        // trim : true,
        required: false,
    },
    nickname: {
        type: String,
        // trim : true,
        required: false,
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
