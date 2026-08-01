const { InferenceClient } = require("@huggingface/inference");
const { createError } = require("../error");

const DEFAULT_MODEL = "black-forest-labs/FLUX.1-dev";
const DEFAULT_PROVIDER = "fal-ai";

const getToken = () => process.env.HF_TOKEN || process.env.HF_ACCESS_TOKEN;

const blobToBase64 = async (blob) => {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mime = blob.type || "image/png";
  return `data:${mime};base64,${buffer.toString("base64")}`;
};

const generateWithHuggingFace = async (prompt) => {
  const token = getToken();

  if (!token || token.includes("your_token_here")) {
    throw createError(
      500,
      "HF_TOKEN is missing. Create a free token with Inference permissions at https://huggingface.co/settings/tokens"
    );
  }

  const client = new InferenceClient(token);
  const model = process.env.HF_MODEL || DEFAULT_MODEL;
  const provider = process.env.HF_PROVIDER || DEFAULT_PROVIDER;

  try {
    const image = await client.textToImage({
      provider,
      model,
      inputs: prompt,
      parameters: {
        num_inference_steps: Number(process.env.HF_INFERENCE_STEPS) || 5,
      },
    });

    // SDK may return a Blob (browser/node) or ArrayBuffer/Uint8Array
    if (image && typeof image.arrayBuffer === "function") {
      return blobToBase64(image);
    }

    if (Buffer.isBuffer(image)) {
      return `data:image/png;base64,${image.toString("base64")}`;
    }

    if (image instanceof ArrayBuffer) {
      return `data:image/png;base64,${Buffer.from(image).toString("base64")}`;
    }

    if (image?.byteLength !== undefined) {
      return `data:image/png;base64,${Buffer.from(image).toString("base64")}`;
    }

    throw createError(500, "Unexpected image format from Hugging Face");
  } catch (error) {
    if (error.status) {
      throw error;
    }

    const message =
      error?.message ||
      error?.error ||
      "Failed to generate image with Hugging Face";

    if (/loading|warming|503/i.test(message)) {
      throw createError(
        503,
        "Model is loading on Hugging Face. Please try again in a few seconds."
      );
    }

    throw createError(500, message);
  }
};

module.exports = { generateWithHuggingFace };
