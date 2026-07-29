
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Theme";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.3s ease-in-out; 
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 3;
`;


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<CreatePost />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
