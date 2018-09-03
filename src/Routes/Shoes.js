import React from "react";
import { graphql, compose } from "react-apollo";
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
import ProfileMenu from "../Components/ProfileMenu.js";
import jwt_decode from "jwt-decode";

let AllShoesQuery = gql`
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
let LikeShoeMutation = gql`
  mutation($shoeId: Int!, $userId: Int!) {
    likeShoe(userId: $userId, shoeId: $shoeId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
// ({ data: { loading, getAllShoes } })
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
      <ProfileMenu currentUserId={currentUserId.user.id}>
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
          <Grid
            centered
            style={{ marginTop: "20px" }}
            columns="three"
            stackable={true}
          >
            {getAllShoes.map((shoe, index) => (
              <ShoeCell
                key={`shoe-${shoe.model}-${index}`}
                profileImg={shoe.owner.profilePic}
                shoe={shoe}
                onLikeClick={async () => {
                  await this.props.mutate({
                    variables: {
                      userId: currentUserId.user.id,
                      shoeId: shoe.id
                    },
                    update: (proxy, { data: { likedShoe } }) => {
                      const data = proxy.readQuery({ query: AllShoesQuery });
                      data.getAllShoes[index].numberOfLikes += 1;
                      proxy.writeQuery({ query: AllShoesQuery, data });
                    }
                  });
                }}
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
export default compose(
  graphql(LikeShoeMutation),
  graphql(AllShoesQuery, {
    options: () => ({
      fetchPolicy: "cache-and-network"
    })
  })
)(Shoes);
