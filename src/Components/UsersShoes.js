import React from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import ShoeCell from "./ShoeCell";

const UsersShoes = ({ profilePic, shoes }) => (
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
export default UsersShoes;

let style = {
  grid: {
    display: "flex",
    padding: "20px 0",
    justifyContent: "center"
  }
};
