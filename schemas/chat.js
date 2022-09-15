const mongoose = require("mongoose");
const { Schema } = mongoose;
const chatSchema = new Schema({

    room: {
        type: String,
        required: false,
    },
    chatLog: {
        type: Array,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(`Chat`, chatSchema);