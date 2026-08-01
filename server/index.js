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
  res.status(200).json({ message: "Hello GenIMG API!" });
});

app.use("/api/post", postRoutes);
app.use("/api/generateImage", generateImageRoutes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
