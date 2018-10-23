import React from "react";
import styled, { css } from "styled-components";
import { Consumer } from "../App";

const RightSide = styled.div`
    height: 100%
    position: fixed;
    top: 0;
    right: 0;
    background-color: red;
    width: 20rem;
    transform: translateX(0);
    transition: transform 400ms ease-in;
    ${props =>
      props.open &&
      css`
        transform: translateX(15rem);
        transition: transform 400ms ease-in;
      `}
`;
const OptionsList = styled.ul`
  list-style: none;
  width: 100%;
`;
const OptionItem = styled.li`
  padding: 2rem 0;
  font-size: 18px;
  width: 100%;
  padding-left: 3rem;
`;
const StyledSvg = styled.svg`
  position: absolute;
  padding: 10px 0;

  height: 100px;
  width: 70px;
`;

class RightSideBar extends React.Component {
  state = {
    open: true
  };
  render() {
    return (
      <RightSide open={this.state.open}>
        <StyledSvg
          onClick={() => this.setState({ open: !this.state.open })}
          viewBox="0 0 50 50"
        >
          <path
            d="M35 0 L0 25 35 50"
            strokeLinecap="round"
            fill="none"
            stroke="black"
            strokeWidth="3px"
          />
        </StyledSvg>
        <OptionsList>
          <OptionItem>Messages</OptionItem>
          <OptionItem>Shopping Cart</OptionItem>
        </OptionsList>
      </RightSide>
    );
  }
}
export default RightSideBar;
