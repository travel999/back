const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        trim : true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim : true,
        required: true,
    },
    nickname: {
        type: String,
        trim : true,
        required: true,
    },
    userimage:{
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(`User`, userSchema);