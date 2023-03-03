import React, { useRef } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";

function App() {
  return (
    <Container>
      <Sidebar />
      <Canvas />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

export default App;
