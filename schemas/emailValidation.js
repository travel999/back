const mongoose = require("mongoose");
const { Schema } = mongoose;
const emailSchema = new Schema({

    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        dafault: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(`Email`, emailSchema);