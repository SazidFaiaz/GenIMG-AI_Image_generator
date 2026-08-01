const { createError } = require("../error");
const { uploadImage, isCloudinaryConfigured } = require("../utils/cloudinary");

const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return next(createError(400, "Prompt is required"));
    }

    const encodedPrompt = encodeURIComponent(prompt.trim());
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&enhance=true&seed=${Date.now()}`;

    // Without Cloudinary, return the generated image URL directly
    if (!isCloudinaryConfigured()) {
      return res.status(200).json({
        success: true,
        photo: imageUrl,
      });
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      return next(createError(500, "Failed to generate image from AI provider"));
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;
    const photoUrl = await uploadImage(base64Image, imageUrl);

    return res.status(200).json({
      success: true,
      photo: photoUrl,
    });
  } catch (error) {
    return next(
      createError(
        error.status || 500,
        error.message || "Failed to generate image"
      )
    );
  }
};

module.exports = { generateImage };
