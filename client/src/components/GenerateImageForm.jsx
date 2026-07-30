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


const GenerateImageForm = () => {
    return <Form>

        <Top>
            <Title>Generate Image</Title>

            <Desc>Write prompt</Desc>
        </Top>

        <Body>

            <TextInput label="Author" placeholder="Enter your Name.." name="name" />
            <TextInput label="Prompt" placeholder="Describe the image you want to generate.." name="name" rows={8} textArea/>
            ** You can post your generated image by create post **
        </Body>

        <Actions>
            <Button text="Generate" flex leftIcon={<AutoAwesome/>} />
            <Button text="Create Post" flex type="secondary" leftIcon={<CreateRounded />} />
        </Actions>


    </Form>

};

export default GenerateImageForm;