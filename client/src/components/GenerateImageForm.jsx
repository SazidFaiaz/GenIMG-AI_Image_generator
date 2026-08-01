import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { CreatePost, GenerateAIImage } from "../api";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setCreatePostLoading,
  generateImageLoading,
  setGenerateImageLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const generateImageFun = async () => {
    setGenerateImageLoading(true);
    setError("");
    try {
      const res = await GenerateAIImage(post.prompt);
      setPost((prev) => ({
        ...prev,
        photo: res?.photo,
      }));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to generate image");
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createPostFun = async () => {
    setCreatePostLoading(true);
    setError("");
    try {
      await CreatePost(post);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create post");
    } finally {
      setCreatePostLoading(false);
    }
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image</Title>
        <Desc>Write a prompt to generate an image with AI</Desc>
      </Top>

      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your Name.."
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Prompt"
          placeholder="Describe the image you want to generate.."
          name="prompt"
          rows={8}
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        ** You can post your generated image by create post **
      </Body>

      <Actions>
        <Button
          text="Generate"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={generateImageFun}
        />
        <Button
          text="Create Post"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={createPostFun}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
