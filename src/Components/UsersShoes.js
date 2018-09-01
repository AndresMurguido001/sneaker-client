import React from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import ShoeCell from "./ShoeCell";

const UsersShoes = ({ shoes }) => (
  <Container>
    <Header as="h3" block>
      Your Currently Listed Shoes
    </Header>
    <Grid columns={3}>
      {shoes.map((shoe, index) => {
        return (
          <ShoeCell
            key={`shoe-${shoe.model}-${index}`}
            profileImg={shoe.owner.profilePic}
            shoe={shoe}
          />
        );
      })}
    </Grid>
  </Container>
);
export default UsersShoes;
