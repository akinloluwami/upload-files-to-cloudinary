require("dotenv").config();
const Post = require("../models/Post");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

async function Create(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
    });
  }
  const tkn = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
    });
  }
  const {
    title,
    description,
    socialLinks,
    links,
    tokenContract,
    tags,
    linkToTokenomics,
  } = req.body;
  const admin = await Admin.findById(decoded.id);

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  //   const file = await req.files.image;

  const fi = req.files;
  if (!fi) {
    return res.status(400).json({
      message: "Please upload an image",
    });
  }
  const file = await fi.image;
  //if file is not image
  if (!file.mimetype.startsWith("image")) {
    return res.status(400).json({
      message: "Only image files are allowed",
    });
  }

  //file size in bytes so we need to convert to MB
  const maxImageSize = parseInt(process.env.MAX_IMAGE_SIZE / 1000000);

  //if file is too big
  if (file.size > process.env.MAX_IMAGE_SIZE) {
    return res.status(400).json({
      message: `Please upload an image less than ${maxImageSize} MB`,
    });
  }
  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }
  if (!description) {
    return res.status(400).json({
      message: "Description is required",
    });
  }
  if (!socialLinks) {
    return res.status(400).json({
      message: "Social links is required",
    });
  }
  if (!tags) {
    return res.status(400).json({
      message: "Tags is required",
    });
  }
  if (!tokenContract) {
    return res.status(400).json({
      message: "Token contract is required",
    });
  }

  cloudinary.uploader
    .upload(file.tempFilePath, {
      folder: process.env.IMAGE_FOLDER,
      public_id: process.env.CLOUD_NAME + "_" + Date.now(),
      resource_type: "auto",
    })
    .then((result) => {
      const post = new Post({
        title,
        description,
        imageUrl: result.secure_url,
        socialLinks,
        links,
        tokenContract,
        tags,
        linkToTokenomics,
        adminId: admin._id,
        postId: Date.now(),
      });
      post
        .save()
        .then((post) => {
          res.status(200).json({
            message: "Post created successfully",
            post,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error creating post",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error uploading image",
        error: err,
      });
    });
}

module.exports = {
  Create,
};
