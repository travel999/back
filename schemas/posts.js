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
    day:{
        type: Array,
        required: true,
        cardNum: {
            type: Array,
            required: true,
            
            placeName: {
                type: String,
                required: true,
            },
            locate: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            }
        }
    }
    ,
        
   

    openPublic: {
        type: Boolean,
        default: false
    },
    like: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


});

module.exports = mongoose.model(`Post`, postSchema);