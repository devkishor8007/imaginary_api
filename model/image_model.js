const mongoose = require("mongoose");

const ImageData = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("ImageData", ImageData);
