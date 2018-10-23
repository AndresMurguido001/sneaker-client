import React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, 0);
  & .circlePath {
    stroke: #fff;
    stroke-linecap: round;
    animation: strokeCircle 1000ms ease-in forwards;
  }
  & .lineThrough {
    stroke-dashoffset: 100;
    stroke-dasharray: 100;
    animation: midLine 500ms ease-in 1000ms forwards;
  }
  @keyframes midLine {
    0% {
      stroke-dashoffset: 100;
      stroke-dasharray: 100;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes strokeCircle {
    0% {
      stroke-dasharray: 130;
      stroke-dashoffset: 130;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

const EmptyInventoryWrap = styled.div`
  display: flex;
  text-align: center;
  width: 50%;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  box-shadow: 5px 10px 23px -4px rgba(0, 0, 0, 0.75);
  h3 {
    font-size: 30px;
    color: #fff;
  }
`;

export default () => (
  <EmptyInventoryWrap>
    <h3>Sorry no shoes have been posted</h3>
    <StyledSvg viewBox="0 0 50 50">
      <path
        className="lineThrough"
        d="M12 40 L38 10"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2"
        id="MyCircle"
      />
      <circle
        className="circlePath"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="2"
      />
    </StyledSvg>
  </EmptyInventoryWrap>
);
