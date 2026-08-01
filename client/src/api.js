import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
});

export const GetPosts = async () => {
  const response = await API.get("/api/post/");
  return response.data;
};

export const CreatePost = async (postData) => {
  const response = await API.post("/api/post/", postData);
  return response.data;
};

export const GenerateAIImage = async (prompt) => {
  const response = await API.post("/api/generateImage/", { prompt });
  return response.data;
};
