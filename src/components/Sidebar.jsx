import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Sidebar = () => {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "View", value: "1" },
    { name: "Draw", value: "2" },
  ];

  return (
    <Container>
      <div className="top-part">
        <CloseIcon className="close-icon" />
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="light"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <hr />
    </Container>
  );
};

const Container = styled.div`
  flex: 2;
  height: 100vh;
  padding: 20px;
  box-shadow: 2px 2px #e5e5e5;

  .top-part {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .top-part .close-icon {
    cursor: pointer;
  }
`;

export default Sidebar;
