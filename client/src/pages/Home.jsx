import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import { CircularProgress } from "@mui/material";
import { GetPosts } from "../api";

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
  gap: 24px;
  @media (max-width: 768px) {
    padding: 8px 10px;
  }
`;

const Headline = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await GetPosts();
      setPosts(res?.data || []);
      setFilteredPosts(res?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
      return;
    }

    const searchFilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const authorMatch = post?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return promptMatch || authorMatch;
    });

    setFilteredPosts(searchFilteredPosts);
  }, [posts, search]);

  return (
    <Container>
      <Headline>
        Welcome to GenImg! Explore posts here..
        <Span>☆ Generated With GenAI ☆ </Span>
      </Headline>
      <SearchBar search={search} setSearch={setSearch} />
      <Wrapper>
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {error ? (
              <div style={{ color: "red" }}>{error}</div>
            ) : filteredPosts.length === 0 ? (
              <>No Posts Found</>
            ) : (
              filteredPosts.map((item, index) => (
                <ImageCard key={item?._id || index} item={item} />
              ))
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
