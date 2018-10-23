import React from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../App";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

let NavWrap = styled.div`
  width: 100vw;
  height: 10rem;
  position: absolute;
  top: 0;
`;
let Nav = styled.ul`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  height: 100%;
  width: 50%;
  float: right;
  list-style: none;
`;
let NavItem = styled.li`
  color: #fff;
  font-size: 1.5em;
  transform: scale(1);
  transition: transform 200ms ease-in;
  transform-origin: center;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 200ms ease-in;
  }
`;

export const HomeNav = ({ handleLoginClick }) => {
  return (
    <Consumer>
      {value => (
        <NavWrap>
          <Nav>
            <Link to="/">
              <NavItem>
                <Icon name="home" />
                Home
              </NavItem>
            </Link>
            <Link to="/shoes">
              <NavItem>
                <Icon name="shopping bag" />
                Shop
              </NavItem>
            </Link>
            {value > 0 ? (
              <Link to={`/${value}`}>
                <NavItem>
                  <Icon name="user" />
                  Profile
                </NavItem>
              </Link>
            ) : (
              <NavItem onClick={() => handleLoginClick()}>
                <Icon name="arrow right" />
                Login
              </NavItem>
            )}
          </Nav>
        </NavWrap>
      )}
    </Consumer>
  );
};
