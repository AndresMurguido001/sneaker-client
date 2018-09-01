import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Container,
  Grid,
  Dimmer,
  Loader,
  Header,
  Image
} from "semantic-ui-react";
import ShoeBg from "../images/ShoesIndex.jpg";
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
      <Image
        style={{ width: "100%", padding: "20px 0" }}
        src={ShoeBg}
        size="huge"
      />
      <Header style={styles.header} textAlign="left" size="large">
        Welcome To Our Store
      </Header>
      <Header style={styles.subHead} textAlign="left" sub>
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
let styles = {
  header: {
    position: "absolute",
    top: "100px",
    left: "200px",
    fontSize: "50px",
    color: "#fff",
    textShadow: "2px 2px 14px rgba(150, 150, 150, 1)"
  },
  subHead: {
    position: "absolute",
    width: "20rem",
    top: "200px",
    left: "200px",
    fontSize: "20px",
    color: "#fff",
    textShadow: "2px 2px 14px rgba(150, 150, 150, 1)"
  }
};
export default graphql(AllShoesQuery)(Shoes);
