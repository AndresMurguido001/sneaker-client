import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Container,
  Grid,
  Dimmer,
  Loader,
  Header,
  Image,
  Divider
} from "semantic-ui-react";
import ShoeBg from "../images/ShoesIndex.jpg";
import ShoeCell from "../Components/ShoeCell";
import ProfileMenu from "../Components/ProfileMenu.js";
import jwt_decode from "jwt-decode";

export const AllShoesQuery = gql`
  query {
    getAllShoes {
      id
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

class Shoes extends React.Component {
  render() {
    let currentUserId = jwt_decode(localStorage.getItem("token"));
    const {
      data: { loading, getAllShoes }
    } = this.props;
    if (loading) {
      return (
        <Dimmer active>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <ProfileMenu>
        <Container fluid>
          <Image src={ShoeBg} fluid centered style={styles.headBgImg} />
          <Container style={styles.textCont}>
            <Header
              style={styles.headers}
              inverted
              textAlign="left"
              size="large"
            >
              Welcome To Our Store
            </Header>
            <Header style={styles.headers} inverted textAlign="left" sub>
              Shoes for any occassion. Sneakerhead store allows anyone to sell
              new shoes. Anyone from a retailer to individuals share their shoes
              with the world.
            </Header>
          </Container>
          {/* Figure Out how to get uploaded shoe to display on index after being created */}
          <Grid style={{ marginTop: "20px" }} columns="three" stackable={true}>
            {getAllShoes.map((shoe, index) => (
              <ShoeCell
                currentUser={currentUserId.user.id}
                key={`shoe-${shoe.model}-${index}`}
                profileImg={shoe.owner.profilePic}
                shoe={shoe}
                index={index}
              />
            ))}
          </Grid>
        </Container>
      </ProfileMenu>
    );
  }
}
let styles = {
  textCont: {
    position: "absolute",
    top: "100px",
    left: "80px",
    fontSize: "2rem",
    width: "300px"
  },
  headers: {
    textShadow: "2px 2px 11px rgba(0, 0, 0, 0.5)"
  }
};
export default graphql(AllShoesQuery)(Shoes);
