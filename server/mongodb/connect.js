const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
      console.error("MongoDB connection failed");
      throw error;
    });
};

module.exports = connectDB;
