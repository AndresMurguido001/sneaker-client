import styled, { css } from "styled-components";

export const IconWrapper = styled.div`
  transform: rotateY(0) translateX(0);
  position: absolute;
  top: 0;
  left: 0;
  width: 25vw;
  height: 10vh;
  transform-origin: bottom center;
  transition: all 300ms ease-in;
  ${props =>
    props.visible &&
    css`
      transform: rotateY(-180deg) translateX(180px);
      transition: all 300ms ease-in;
    `};
`;
export const SideBarWrapper = styled.div`
  background-color: rgba(12, 19, 64, 0.7);
`;
