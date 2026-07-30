import React from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImageCard from "../components/GeneratedImageCard";

const Container = styled.div`
    height: 100%;   
    width: 100%;
    overflow-y: scroll;
    background: ${({ theme }) => theme.bg};
    padding: 28px 28px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    gap: 24px;
    @media (max-width: 768) {
        padding: 8px 10px;

`;


const Wrapper = styled.div`

  height: fit-content;
  width: 100%;
  max-width: 1200px;
  gap: 9%;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
`;

const CreatePost = () => {

  
  return ( 
  <Container>

    <Wrapper>
      <GenerateImageForm />
      <GeneratedImageCard loading />
    </Wrapper>
  </Container>
  );
};

export default CreatePost;
