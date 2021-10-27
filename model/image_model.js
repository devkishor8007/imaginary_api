const mongoose = require("mongoose");

const ImageData = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ImageData", ImageData);
