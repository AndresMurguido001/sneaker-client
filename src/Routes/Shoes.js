import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Container,
  Dimmer,
  Loader,
  Header,
  Icon,
  Grid
} from "semantic-ui-react";
import ShoeCell from "../Components/ShoeCell";
import ProfileMenu from "../Components/ProfileMenu.js";
import { Consumer } from "../App";
//Style
import styles from "../styles/Shoes";
import CardAnimateWrap from "../Components/CardAnimateWrap";

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

    let ShoeCells = () => (
      <Consumer>
        {value =>
          getAllShoes.map((shoe, index) => (
            <CardAnimateWrap key={`${shoe.brand}-${index}`}>
              <ShoeCell
                currentUser={value}
                key={`shoe-${shoe.model}-${index}`}
                profileImg={shoe.owner.profilePic}
                shoe={shoe}
                index={index}
              />
            </CardAnimateWrap>
          ))
        }
      </Consumer>
    );

    return (
      <ProfileMenu>
        <Container fluid>
          <div
            ref={el => (this.mainImage = el)}
            style={styles.shoesIndex.mainBgLg}
          >
            <div
              style={styles.shoesIndex.headerWrap}
              ref={el => (this.headerWrap = el)}
            >
              <Header
                style={styles.shoesIndex.primaryHeader}
                inverted
                textAlign="left"
              >
                Welcome To Our Store
              </Header>
              <Header
                style={styles.shoesIndex.secondaryHeader}
                inverted
                textAlign="left"
                sub
              >
                Shoes for any occassion. Sneakerhead store allows anyone to sell
                new shoes. Anyone from a retailer to individuals share their
                shoes with the world.
              </Header>
            </div>
          </div>

          {/* Figure Out how to get uploaded shoe to display on index after being created */}
        </Container>

        <Header as="h2" attached="top" block>
          <Icon name="chevron down" />
          Currently Listed Shoes
        </Header>
        <div style={style.flex}>
          <Grid style={style.gridContainer} columns="4">
            <ShoeCells />
          </Grid>
        </div>
      </ProfileMenu>
    );
  }
}
let style = {
  flex: {
    display: "flex",
    width: "100%",
    float: "left",
    justifyContent: "center",
    padding: "2rem 0",
    margin: "2rem 0",
    background:
      "linear-gradient(to bottom, rgba(50,166,255,1) 0%,rgba(156,223,229,1) 50%,rgba(255,255,255,1) 100%)",
    flexWrap: "wrap"
  },
  gridContainer: {
    margin: "auto",
    width: "90%"
  }
};

export default graphql(AllShoesQuery)(Shoes);
