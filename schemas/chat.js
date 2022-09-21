const mongoose = require("mongoose");
const { Schema } = mongoose;
const chatSchema = new Schema({

    room: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    chatLog: {
        type: Array,
        required: false,
    },
    nickname: {
        type: Array,
        required: false,
    },
    chatTime: {
        type: Array,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(`Chat`, chatSchema);