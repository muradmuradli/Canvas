import React from "react";
import styled from "styled-components";
import { Stage, Layer, Line, Image } from "react-konva";
import { useEffect, useState, useRef } from "react";
import Konva from "konva";
import ZoomButtons from "./ZoomButtons";

const Canvas = () => {
  const [scaleBy, setScaleBy] = useState(1.1);
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [treeImage, setTreeImage] = useState(new window.Image());
  const imageRef = useRef();
  const stageRef = useRef();
  const lineRef = useRef();
  const mouseRef = useRef();

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
    const handleMouseMove = (event) => {
      mouseRef.current.style.top = event.clientY + "px";
      mouseRef.current.style.left = event.clientX + "px";
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const img = new window.Image(1000, 1000);
    img.crossOrigin = "Anonymous";
    img.src = "/tree.jpg";
    setTreeImage(img);
  }, []);

  useEffect(() => {
    if (treeImage) {
      imageRef.current.cache();
    }
  }, [treeImage]);

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

    lineRef.current.cache();
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
            image={treeImage}
            ref={imageRef}
          />
          {lines.map((line, i) => (
            <Line
              className="line"
              key={i}
              points={line.points}
              stroke="#4f8dcf"
              filters={[Konva.Filters.Pixelate]}
              strokeWidth={40}
              opacity={0.5}
              tension={0.5}
              ref={lineRef}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
      <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
      <div ref={mouseRef} id="mouse-circle">
        <img src="/cursor.png" alt="circle" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  flex: 8;
  display: flex;
  background-color: #f3f3f3;
  cursor: crosshair;

  #mouse-circle {
    position: absolute;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    border-radius: 50%;
    pointer-events: none;
  }

  #mouse-circle img {
    height: 100%;
  }
`;

export default Canvas;
