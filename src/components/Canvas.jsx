import React from "react";
import styled from "styled-components";
// import SampleImg from "/tree.jpg";
import { Stage, Layer, Line, Text, Image } from "react-konva";
import { useEffect, useState, useRef } from "react";
import Konva from "konva";
import ZoomButtons from "./ZoomButtons";

const Canvas = () => {
  const [scaleBy, setScaleBy] = useState(1.1);
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [image, setImage] = useState();
  const imageRef = useRef();
  const stageRef = useRef(null);

  const zoomIn = (e) => {
    e.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      stage.scale({ x: scaleBy, y: scaleBy });
      setScaleBy((prevScale) => {
        return prevScale + 0.1;
      });
    }
  };

  const zoomOut = (e) => {
    e.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      stage.scale({ x: scaleBy, y: scaleBy });
      setScaleBy((prevScale) => {
        return prevScale - 0.1;
      });
    }
  };

  useEffect(() => {
    const img = new window.Image(1000, 1000);
    img.crossOrigin = "Anonymous";
    img.src = "/tree.jpg";

    setImage(img);
  }, []);

  useEffect(() => {
    if (image) {
      imageRef.current.cache();
      imageRef.current.getLayer().batchDraw();
    }
  }, [image]);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Container>
      <Stage
        className="stage"
        width={1100}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <Image
            filters={[Konva.Filters.Pixelate]}
            x={100}
            y={0}
            image={image}
            ref={imageRef}
          />
          {lines.map((line, i) => (
            <Line
              className="line"
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={30}
              opacity={0.5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
    </Container>
  );
};

const Container = styled.div`
  flex: 8;
  display: flex;
  background-color: #f3f3f3;

  .line {
    border: 1px solid black;
  }
`;

export default Canvas;
