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
