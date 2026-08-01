const Post = require("../models/Posts");
const { createError } = require("../error");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error.message || "Failed to fetch posts"
      )
    );
  }
};

const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;

    if (!name || !prompt || !photo) {
      return next(createError(400, "Name, prompt, and photo are required"));
    }

    const newPost = await Post.create({ name, prompt, photo });
    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error.message || "Failed to create post"
      )
    );
  }
};

module.exports = { getAllPosts, createPost };
