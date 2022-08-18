const Review = require("../models/Review");
const Post = require("../models/Post");

async function Create(req, res) {
  const { name, comment, rating, postId } = req.body;
  const review = new Review({
    name,
    comment,
    rating,
    postId,
  });
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  if (!name) {
    res.status(400).json({
      message: "Name is required",
    });
  }
  if (!comment) {
    res.status(400).json({
      message: "Comment is required",
    });
  }
  if (comment && comment.split(" ").length < 2) {
    res.status(400).json({
      message: "Comment must be at least 2 words",
    });
  }
  if (!rating) {
    res.status(400).json({
      message: "Rating is required",
    });
  }
  if (rating < 1 || rating > 5) {
    res.status(400).json({
      message: "Rating must be between 1 and 5",
    });
  }
  if (typeof rating !== "number") {
    res.status(400).json({
      message: "Rating must be a number between 1 and 5",
    });
  }
  if (!postId) {
    res.status(400).json({
      message: "PostId is required",
    });
  }
  await review.save();
  res.status(200).json({
    message: "Review created successfully",
  });
}

async function GetAll(req, res) {
  const { postId } = req.params;
  const reviews = await Review.find({ postId });
  res.status(200).json({
    message: "Reviews fetched successfully",
    reviews,
  });
}

module.exports = {
  Create,
  GetAll,
};
