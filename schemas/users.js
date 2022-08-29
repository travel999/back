const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    Email: {
        type: String,
        trim : true,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        trim : true,
        required: true,
    },
    Nickname: {
        type: String,
        trim : true,
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