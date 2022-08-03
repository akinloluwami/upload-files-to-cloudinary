const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  socialLinks: {
    type: Array,
  },
  links: {
    type: Array,
  },
  tokenContract: {
    type: String,
  },
  tags: {
    type: Array,
  },
  linkToTokenomics: {
    type: String,
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

module.exports = mongoose.model("Post", PostSchema);
