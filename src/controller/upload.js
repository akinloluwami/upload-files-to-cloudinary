require("dotenv").config();
const cloudinary = require("cloudinary");

module.exports = {
  uploadImage: async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    const file = await req.files.image;

    if (!file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

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
    cloudinary.uploader
      .upload(file.tempFilePath, {
        folder: process.env.IMAGE_FOLDER,
        public_id: process.env.CLOUD_NAME + "_" + Date.now(),
        resource_type: "auto",
      })
      .then((result) => {
        res.status(200).json({
          message: "Image uploaded successfully",
          image: result.secure_url,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error uploading image",
          error: err,
        });
      });
  },
};
