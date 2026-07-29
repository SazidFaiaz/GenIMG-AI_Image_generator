import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
    

const Container = styled.div`
    height: 100%;   
    overflow-y: scroll;
    background: ${({ theme }) => theme.bg};
    padding: 28px 28px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    gap: 24px;
    @media (max-width: 768) {
        padding: 8px 10px;

`;



const Headline = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (max-width: 768px) {
        font-size: 22x;
    }
`;
const Span = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.secondary};
`;

const Home = () => {
  return <Container>Home

    <Headline>Welcome to GenImg! Explore posts here..
        <Span>☆ Generated With GenAI ☆ </Span>
    </Headline>
    <SearchBar />
  </Container>;
};

export default Home;