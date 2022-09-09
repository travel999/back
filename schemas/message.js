const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  // },
  room: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('msg', msgSchema);
module.exports = Message;