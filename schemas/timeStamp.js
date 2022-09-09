const mongoose = require("mongoose");
const timeStampSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  workSpaceName: {
      type: String,
      required: true
  }
});

const timeStamp = mongoose.model("timeStamp", timeStampSchema);
module.exports = timeStamp;

