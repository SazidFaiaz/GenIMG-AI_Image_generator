const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async (url, { retries = 8, delayMs = 3000 } = {}) => {
  if (!url) {
    throw new Error("MONGODB_URL is missing in server/.env");
  }

  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () => {
    isConnected = true;
    console.log("MongoDB Atlas connected");
  });

  mongoose.connection.on("disconnected", () => {
    isConnected = false;
    console.warn("MongoDB disconnected");
  });

  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(url, {
        serverSelectionTimeoutMS: 10000,
        family: 4,
      });
      isConnected = true;
      return mongoose.connection;
    } catch (error) {
      lastError = error;
      isConnected = false;
      console.error(
        `MongoDB connect attempt ${attempt}/${retries} failed:`,
        error.message
      );

      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  console.error(
    "Tip: In Atlas → Network Access, allow your IP (or 0.0.0.0/0 for dev)."
  );
  throw lastError;
};

const getDbStatus = () => ({
  isConnected,
  readyState: mongoose.connection.readyState,
});

module.exports = connectDB;
module.exports.getDbStatus = getDbStatus;
