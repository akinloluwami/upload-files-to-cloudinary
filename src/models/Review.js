const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
