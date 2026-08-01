const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./mongodb/connect");
const postRoutes = require("./routes/Post");
const generateImageRoutes = require("./routes/GenerateImage");
const { errorHandler } = require("./error");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello GenIMG API!",
    mongoReadyState: require("mongoose").connection.readyState,
  });
});

app.use("/api/post", postRoutes);
app.use("/api/generateImage", generateImageRoutes);
app.use(errorHandler);

const startServer = async () => {
  const port = process.env.PORT || 8080;

  // Start API first so the frontend does not hang with a dead backend
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  try {
    await connectDB(process.env.MONGODB_URL);
  } catch (error) {
    console.error("MongoDB is not connected yet:", error.message);
    console.error(
      "API is running, but /api/post will fail until Atlas Network Access allows your IP."
    );
  }
};

startServer();
