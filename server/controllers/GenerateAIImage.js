const { createError } = require("../error");
const { uploadImage } = require("../utils/cloudinary");
const { generateWithHuggingFace } = require("../utils/huggingFace");

const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return next(createError(400, "Prompt is required"));
    }

    const base64Image = await generateWithHuggingFace(prompt.trim());
    const photoUrl = await uploadImage(base64Image);

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
