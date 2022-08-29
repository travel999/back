const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Nickname: {
        type: String,
        required: true,
    },
    Userimage:{
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(`User`, userSchema);