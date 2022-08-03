require("dotenv").config();

const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully 🔥");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnection;
