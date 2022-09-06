const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        // trim : true,
        required: false,
        unique: true,
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
    userImage:{
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    userId: {//카카오
        type: String,
        required: true,
        unique: true
    },
    provider: {//카카오
        type: String
    },
    profileImage: {//카카오
        type: String
    },

});

module.exports = mongoose.model(`User`, userSchema);