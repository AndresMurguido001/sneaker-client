import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Container, Grid, Dimmer, Loader, Header } from "semantic-ui-react";
import ShoeCell from "../Components/ShoeCell";

let AllShoesQuery = gql`
  query {
    getAllShoes {
      brand
      owner {
        id
        profilePic
      }
      model
      numberOfLikes
      size
      description
      photos
    }
  }
`;

const Shoes = ({ data: { loading, getAllShoes } }) =>
  loading ? (
    <Dimmer active>
      <Loader size="large">Loading</Loader>
    </Dimmer>
  ) : (
    <Container>
      <Header style={{ padding: "10px 0" }} textAlign="center" as="h2">
        Welcome To Our Store
      </Header>
      <Header style={{ padding: "10px 0" }} textAlign="center" sub>
        Shoes for any occassion. Sneakerhead store allows anyone to sell new
        shoes. Anyone from a retailer to individuals share their shoes with the
        world.
      </Header>
      <Grid columns="three" stackable={true}>
        {getAllShoes.map((shoe, index) => (
          <ShoeCell
            key={`shoe-${shoe.model}-${index}`}
            profileImg={shoe.owner.profilePic}
            shoe={shoe}
          />
        ))}
      </Grid>
    </Container>
  );

export default graphql(AllShoesQuery)(Shoes);
