import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 0;
  width: 200px;
  height: 100px;
  padding: 10px;

  button {
    border: 1px solid #919191;
    height: 50%;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
  }
`;

const ZoomButtons = ({ zoomIn, zoomOut }) => {
  return (
    <Container className="zoom-buttons">
      <button onClick={(e) => zoomIn(e)}>
        <ZoomInIcon />
      </button>
      <button onClick={(e) => zoomOut(e)}>
        <ZoomOutIcon />
      </button>
    </Container>
  );
};

export default ZoomButtons;
