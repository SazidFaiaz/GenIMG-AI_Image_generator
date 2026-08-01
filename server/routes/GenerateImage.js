const express = require("express");
const { generateImage } = require("../controllers/GenerateAIImage");

const router = express.Router();

router.post("/", generateImage);

module.exports = router;
