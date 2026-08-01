const { v2: cloudinary } = require("cloudinary");
const { createError } = require("../error");

const isCloudinaryConfigured = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;
  return Boolean(
    CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET
  );
};

const uploadImage = async (base64Image, fallbackUrl) => {
  if (!isCloudinaryConfigured()) {
    return fallbackUrl || base64Image;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "genimg",
    });
    return result.secure_url;
  } catch (error) {
    throw createError(500, error.message || "Cloudinary upload failed");
  }
};

module.exports = { uploadImage, isCloudinaryConfigured };
