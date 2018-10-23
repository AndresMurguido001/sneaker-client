import React from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import ShoeCell from "./ShoeCell";
import styled from "styled-components";

const NoUsersShoes = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 30rem;
  background-color: blue;
  & .noShoesSvg {
    height: 300px;
    width: 300px;
    border: 5px solid black;
    border-radius: 50%;
    background-color: red;
  }
`;

const UsersShoes = ({ profilePic, shoes }) => {
  if (shoes.length > 0) {
    return (
      <Container>
        <Header as="h3" block>
          Your Currently Listed Shoes
        </Header>
        <Grid style={style.grid} columns={3}>
          {shoes.map((shoe, index) => {
            return (
              <ShoeCell
                key={`shoe-${shoe.model}-${index}`}
                profileImg={profilePic}
                shoe={shoe}
                usersProfile
              />
            );
          })}
        </Grid>
      </Container>
    );
  }
  return (
    <NoUsersShoes>
      <h1>You havent posted any shoes</h1>
    </NoUsersShoes>
  );
};
export default UsersShoes;

let style = {
  grid: {
    display: "flex",
    padding: "20px 0",
    justifyContent: "center"
  }
};
