const Post = require("../models/Post");
const Review = require("../models/Review");

async function Create(req, res) {
  const { name, comment, rating, postId } = req.body;
  const review = new Review({
    name,
    comment,
    rating,
    postId,
  });
  await review.save();
  res.status(200).json({
    message: "Review created successfully",
  });
}

module.exports = {
  Create,
};
